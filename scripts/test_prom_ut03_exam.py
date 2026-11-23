"""Verifica base, solucion, enunciado y distribuciones del examen UT3."""

from collections import deque
import importlib.util
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "projects/prom/ut03/ExamenUT3"
SOLUTION = ROOT / "soluciones/prom/ut03/ExamenUT3"
EXAM = ROOT / "questions/prom/ut03/examen-practico"
JAVA_PATH = Path("src/main/java/edu/masanz/da/ut3")
SPEC = importlib.util.spec_from_file_location("exam_build", ROOT / "scripts/build-prom-ut03-exam.py")
BUILD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BUILD)


def maps_from_source():
    text = (PROJECT / JAVA_PATH / "util/Conf.java").read_text(encoding="utf-8")
    return [re.findall(r'"([ #+TS]+)"', body) for body in re.findall(
        r"public static final String MAPA_\d =\s*(.*?);", text, re.S)]


def find_route(rows, allow_heal=True):
    terrain = "".join(rows)
    objects = {i: bit for bit, i in enumerate(i for i, c in enumerate(terrain) if c == "+")}
    pending = deque([(1, 1, 100, 0, 0, "")])
    seen = set()
    while pending:
        row, col, life, inventory, collected, route = pending.popleft()
        state = (row, col, life, inventory, collected)
        if state in seen:
            continue
        seen.add(state)
        if terrain[row * 14 + col] == "S":
            return route
        if allow_heal and inventory > 0 and life < 100:
            pending.append((row, col, min(100, life + 30), inventory - 1, collected, route + "1"))
        for action, dr, dc in (("W", -1, 0), ("S", 1, 0), ("A", 0, -1), ("D", 0, 1)):
            nr, nc = row + dr, col + dc
            if not (0 <= nr < 8 and 0 <= nc < 14):
                continue
            index = nr * 14 + nc
            symbol = terrain[index]
            if symbol == "#":
                continue
            health = life - (20 if symbol == "T" else 0)
            if health <= 0:
                continue
            count, mask = inventory, collected
            if symbol == "+" and not mask & (1 << objects[index]):
                mask |= 1 << objects[index]
                count += 1
            pending.append((nr, nc, health, count, mask, route + action))
    return None


class ExamTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        home = os.environ.get("JAVA_HOME")
        compiler = Path(home) / "bin" / ("javac.exe" if os.name == "nt" else "javac") if home else Path(shutil.which("javac") or "")
        cls.compiler = str(compiler)
        cls.java = str(compiler.with_name("java.exe" if os.name == "nt" else "java"))
        version = subprocess.run([cls.compiler, "-version"], capture_output=True, text=True, check=True)
        if not re.search(r"javac 25\b", version.stdout + version.stderr):
            raise RuntimeError("Configura JAVA_HOME con JDK 25.")
        cls.temporary = tempfile.TemporaryDirectory(prefix="prom-ut03-exam-")
        cls.addClassCleanup(cls.temporary.cleanup)
        cls.compiled = {}
        for name, project in (("base", PROJECT), ("solucion", SOLUTION)):
            output = Path(cls.temporary.name) / name
            output.mkdir()
            result = subprocess.run([
                cls.compiler, "--release", "25", "-encoding", "UTF-8", "-d", str(output),
                *map(str, project.rglob("*.java")),
            ], capture_output=True, text=True, encoding="utf-8")
            if result.returncode:
                raise RuntimeError(result.stderr)
            cls.compiled[name] = output

    def run_main(self, data, version="solucion"):
        result = subprocess.run([
            self.java, "-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8",
            "-cp", str(self.compiled[version]), "edu.masanz.da.ut3.app.Main",
        ], input=data, capture_output=True, text=True, encoding="utf-8", timeout=8)
        self.assertEqual(result.returncode, 0, result.stderr)
        return result.stdout

    def test_maps_and_routes(self):
        maps = maps_from_source()
        self.assertEqual(len(maps), 3)
        for rows, traps in zip(maps, (2, 4, 8)):
            self.assertEqual(len(rows), 8)
            self.assertTrue(all(len(row) == 14 for row in rows))
            terrain = "".join(rows)
            self.assertEqual(terrain.count("+"), 3)
            self.assertEqual(terrain.count("T"), traps)
            self.assertEqual(terrain.count("S"), 1)
            self.assertEqual(rows[1][1], " ")
            self.assertEqual(rows[6][12], "S")
            self.assertIsNotNone(find_route(rows))
        self.assertIsNone(find_route(maps[2], allow_heal=False))

    def test_todos_and_score(self):
        fragment = (EXAM / "enunciado-fragmento.html").read_text(encoding="utf-8")
        BUILD.validate(fragment)
        expected = {"GUI.java": ["01", "02"], "Personaje.java": ["11", "12", "13", "14", "15", "16"],
                    "Mapa.java": ["21", "22", "23", "24"], "Main.java": ["31", "32", "33"]}
        for file in PROJECT.rglob("*.java"):
            self.assertEqual(re.findall(r"// TODO (\d{2}):", file.read_text(encoding="utf-8")), expected.get(file.name, []))
        for file in SOLUTION.rglob("*.java"):
            self.assertNotIn("TODO", file.read_text(encoding="utf-8"))

    def test_versions_have_same_api(self):
        base = {p.relative_to(PROJECT) for p in PROJECT.rglob("*.java")}
        solved = {p.relative_to(SOLUTION) for p in SOLUTION.rglob("*.java")}
        self.assertEqual(base, solved)
        for relative in base:
            texts = [(root / relative).read_text(encoding="utf-8") for root in (PROJECT, SOLUTION)]
            signatures = [re.findall(r"public (?:static )?(?:\w+ )?\w+\([^)]*\)", text) for text in texts]
            self.assertEqual(*signatures)
            for text in texts:
                self.assertNotRegex(text, r"\bchar\b|\bcharAt\b|\bPartida\b|\busarBotiquines\b")
        self.assertFalse((PROJECT / JAVA_PATH / "modelo/Partida.java").exists())
        self.assertEqual((PROJECT / JAVA_PATH / "util/Conf.java").read_bytes(),
                         (SOLUTION / JAVA_PATH / "util/Conf.java").read_bytes())

    def test_statement_and_utf8(self):
        fragment = (EXAM / "enunciado-fragmento.html").read_text(encoding="utf-8")
        headings = re.findall(r"<h4[^>]*>.*?</h4>", fragment)
        self.assertIn("Reglas de la partida", headings[0])
        self.assertIn("> Mapa</h4>", headings[1])
        self.assertNotRegex(fragment.lower(), r"jdk|maven|mven|\barrays?\b|\bmatrices\b|estaci[oó]n|escapar|partida\.java")
        self.assertNotIn(BUILD.SOLUTION_ZIP, fragment)
        for root in (PROJECT, SOLUTION, EXAM):
            for file in root.rglob("*"):
                if file.is_file() and file.suffix in (".java", ".html", ".md", ".xml"):
                    self.assertNotRegex(file.read_text(encoding="utf-8"), r"\ufffd|\w\?\w|\u00c3[\u0080-\u00bf]")
        for rows in maps_from_source():
            shown = list(rows)
            shown[1] = shown[1][:1] + "P" + shown[1][2:]
            self.assertIn("\n".join("".join("[" + c + "]" for c in row) for row in shown), fragment)

    def test_archives_are_separate_and_current(self):
        for root, file in ((PROJECT, EXAM / BUILD.ZIP_NAME),
                           (SOLUTION, EXAM / "soluciones" / BUILD.SOLUTION_ZIP)):
            with ZipFile(file) as archive:
                self.assertTrue(all(n.startswith("ExamenUT3/") for n in archive.namelist()))
                self.assertFalse(any("target/" in n or ".idea/" in n or n.endswith(".class") for n in archive.namelist()))
                for source in root.rglob("*"):
                    if source.is_file():
                        self.assertEqual(archive.read("ExamenUT3/" + source.relative_to(root).as_posix()), source.read_bytes())
                self.assertEqual(archive.read("ExamenUT3/enunciado.html"), (EXAM / "enunciado.html").read_bytes())

    def test_base_compiles_without_a_solution(self):
        self.assertEqual(self.run_main("", version="base"), "")

    def test_solution_models(self):
        harness = r'''import edu.masanz.da.ut3.modelo.*;
import edu.masanz.da.ut3.util.Conf;
import edu.masanz.da.ut3.gui.GUI;
public class ModelCheck {
    static void check(boolean value) { if (!value) throw new AssertionError(); }
    public static void main(String[] args) {
        Personaje p = new Personaje();
        check(p.estaVivo() && p.getVida() == 100 && p.getBotiquines() == 0);
        check(!p.usarBotiquin());
        p.recogerBotiquin();
        p.recogerBotiquin();
        check(!p.usarBotiquin() && p.getBotiquines() == 2);
        p.recibirDanio(10);
        check(p.usarBotiquin() && p.getVida() == 100 && p.getBotiquines() == 1);
        p.recibirDanio(50);
        check(p.usarBotiquin() && p.getVida() == 80 && p.getBotiquines() == 0);
        check(!p.usarBotiquin() && p.getVida() == 80);
        p.recibirDanio(-10);
        check(p.getVida() == 80);
        p.recogerBotiquin();
        p.recibirDanio(1000);
        check(p.getVida() == 0 && !p.estaVivo() && !p.usarBotiquin() && p.getBotiquines() == 1);
        p.setFila(4); p.setColumna(5); p.registrarMovimiento(); p.reiniciar();
        check(p.getVida() == 100 && p.getFila() == 1 && p.getColumna() == 1);
        check(p.getBotiquines() == 0 && p.getMovimientos() == 0);
        for (int n = 1; n <= 3; n++) {
            Mapa m = new Mapa(n);
            Personaje originalPersonaje = m.getPersonaje();
            String original = n == 1 ? Conf.MAPA_1 : n == 2 ? Conf.MAPA_2 : Conf.MAPA_3;
            check(m.contiene(0, 0) && m.contiene(7, 13));
            check(!m.contiene(-1, 0) && !m.contiene(0, 14) && !m.contiene(8, 0));
            check(m.obtenerCasilla(-1, 0) == null && m.obtenerCasilla(8, 0) == null);
            check(m.obtenerCasilla(0, Integer.MAX_VALUE) == null && m.obtenerCasilla(Integer.MIN_VALUE, 0) == null);
            m.vaciarCasilla(-1, 0);
            for (int pos = 0; pos < 112; pos++) {
                check(original.substring(pos, pos + 1).equals(m.obtenerCasilla(pos / 14, pos % 14)));
                if ("+".equals(m.obtenerCasilla(pos / 14, pos % 14))) m.vaciarCasilla(pos / 14, pos % 14);
            }
            m.reiniciar();
            check(m.getPersonaje() == originalPersonaje && !m.isGanada() && !m.estaTerminada());
            for (int pos = 0; pos < 112; pos++) check(original.substring(pos, pos + 1).equals(m.obtenerCasilla(pos / 14, pos % 14)));
        }
        Mapa m = new Mapa(1);
        p = m.getPersonaje();
        check(m.mover(null) == Conf.ACCION_DESCONOCIDA);
        check(m.mover("DD") == Conf.ACCION_DESCONOCIDA && m.mover("d") == Conf.ACCION_DESCONOCIDA);
        check(m.mover("A") == Conf.PARED && p.getMovimientos() == 0);
        m.mover("D"); m.mover("D");
        check(m.mover("D") == Conf.BOTIQUIN_RECOGIDO && p.getBotiquines() == 1 && p.getVida() == 100);
        m.mover("A"); m.mover("D");
        check(p.getBotiquines() == 1 && " ".equals(m.obtenerCasilla(1, 4)));
        int moves = p.getMovimientos();
        check(m.mover("S") == Conf.PARED && p.getMovimientos() == moves);
        m.reiniciar();
        m.mover("S"); m.mover("S");
        check(m.mover("D") == Conf.TRAMPA_PISADA && p.getVida() == 80);
        m.mover("A"); m.mover("D");
        check(p.getVida() == 60 && "T".equals(m.obtenerCasilla(3, 2)));
        p.setFila(0); p.setColumna(1);
        moves = p.getMovimientos();
        check(m.mover("W") == Conf.FUERA_DEL_MAPA && p.getFila() == 0 && p.getMovimientos() == moves);
        p.recibirDanio(1000);
        check(m.estaTerminada() && m.mover("D") == Conf.PARTIDA_FINALIZADA);
        m.reiniciar();
        check(!m.estaTerminada() && p.getFila() == 1 && p.getColumna() == 1 && p.getVida() == 100);
        GUI.mostrarCasilla(" "); GUI.mostrarCasilla("+"); GUI.mostrarCasilla("P");
        System.out.print("OK");
    }
}'''
        directory = self.compiled["solucion"]
        source = directory / "ModelCheck.java"
        source.write_text(harness, encoding="utf-8")
        result = subprocess.run([self.compiler, "--release", "25", "-encoding", "UTF-8", "-cp", str(directory),
                                 "-d", str(directory), str(source)], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(result.returncode, 0, result.stderr)
        result = subprocess.run([self.java, "-cp", str(directory), "ModelCheck"], capture_output=True, text=True, encoding="utf-8", timeout=5)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "[ ][+][P]OK")

    def test_play_all_maps_to_victory(self):
        for number, rows in enumerate(maps_from_source(), 1):
            route = find_route(rows)
            output = self.run_main(str(number) + "\n" + "\n".join(route) + "\n0\nD\n")
            self.assertEqual(output.count("Has encontrado la salida."), 1)
            self.assertNotIn("Fin del juego.", output)
            self.assertNotIn("Has elegido salir.", output)
            self.assertNotIn("[null]", output)
            drawn_rows = [line for line in output.splitlines() if re.fullmatch(r"(?:\[[#P +TS]\]){14}", line)]
            self.assertTrue(drawn_rows)
            if number == 3:
                self.assertGreaterEqual(output.count("Has utilizado un botiquín."), 3)

    def test_console_rejections_menu_restart_and_exit(self):
        output = self.run_main("dos\n7\n1\n\nDD\n a \n3\n2\n0\n")
        self.assertIn("Debes introducir un número entero.", output)
        self.assertIn("Debes elegir un mapa del 1 al 3", output)
        self.assertEqual(output.count("Acción desconocida."), 2)
        self.assertIn("No puedes avanzar: hay una pared.", output)
        self.assertEqual(output.count("W. Mover arriba"), 2)
        self.assertEqual(output.count("Mapa reiniciado."), 1)
        self.assertEqual(output.count("Has elegido salir."), 1)
        self.assertNotIn("Has encontrado la salida.", output)
        self.assertIn("Movimientos: 0", output)

    def test_death_and_eof(self):
        output = self.run_main("1\nS\nS\nD\n" + "A\nD\n" * 4 + "0\n")
        self.assertEqual(output.count("Te has quedado sin vida."), 1)
        self.assertNotIn("Has elegido salir.", output)
        self.assertEqual(self.run_main("").count("Has elegido salir."), 1)
        self.assertEqual(self.run_main("1\n").count("Has elegido salir."), 1)


if __name__ == "__main__":
    unittest.main()
