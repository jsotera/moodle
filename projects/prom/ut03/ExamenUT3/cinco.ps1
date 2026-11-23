$jbBase = Join-Path ([System.Environment]::GetFolderPath('ApplicationData')) 'JetBrains'
$logDir = Join-Path $PSScriptRoot 'src\resources\logs'
New-Item -ItemType Directory -Path $logDir -Force -ErrorAction Stop | Out-Null
$output = Join-Path $logDir 'cuatro.txt'
$aiPatterns = @(
    '(^|[\W_])ai($|[\W_])',
    'assistant',
    'chatgpt',
    'openai',
    'copilot',
    'codeium',
    'tabnine',
    'codium',
    'continue',
    'cursor',
    'claude',
    'gemini',
    'qodo',
    'amazonq',
    'jetbrains\.ai',
    'codegpt',
    'llm'
)

function Write-Line {
    param([string]$Text = '')
    $Text | Out-File -FilePath $output -Append -Encoding UTF8
}

function Read-DisabledPluginIds {
    param([string]$IdeDir)

    $disabledFile = Join-Path $IdeDir 'disabled_plugins.txt'
    if (-not (Test-Path $disabledFile)) {
        $disabledFile = Join-Path $IdeDir 'options\disabled_plugins.txt'
    }

    if (-not (Test-Path $disabledFile)) {
        return @()
    }

    return @(Get-Content -Path $disabledFile -ErrorAction SilentlyContinue |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -and -not $_.StartsWith('#') })
}

function Get-PluginInfo {
    param([System.IO.DirectoryInfo]$PluginDir)

    $info = [ordered]@{
        Folder = $PluginDir.Name
        Id = ''
        Name = ''
        Version = ''
        Path = $PluginDir.FullName
    }

    $pluginXml = Get-ChildItem -Path $PluginDir.FullName -Recurse -Filter 'plugin.xml' -ErrorAction SilentlyContinue |
        Select-Object -First 1

    if ($pluginXml) {
        try {
            [xml]$xml = Get-Content -Path $pluginXml.FullName -Raw -ErrorAction Stop
            $ideaPlugin = $xml.'idea-plugin'
            if ($ideaPlugin) {
                $info.Id = [string]$ideaPlugin.id
                $info.Name = [string]$ideaPlugin.name
                $info.Version = [string]$ideaPlugin.version
            }
        } catch {
            $info.Name = 'No se pudo leer plugin.xml'
        }
    }

    if (-not $info.Name -or $info.Name -eq $PluginDir.Name) {
        Add-Type -AssemblyName System.IO.Compression.FileSystem -ErrorAction SilentlyContinue
        $jar = Get-ChildItem -Path $PluginDir.FullName -Recurse -Filter '*.jar' -ErrorAction SilentlyContinue |
            Select-Object -First 1

        if ($jar) {
            try {
                $zip = [System.IO.Compression.ZipFile]::OpenRead($jar.FullName)
                $entry = $zip.Entries | Where-Object { $_.FullName -eq 'META-INF/plugin.xml' } | Select-Object -First 1
                if ($entry) {
                    $reader = New-Object System.IO.StreamReader($entry.Open())
                    [xml]$xml = $reader.ReadToEnd()
                    $reader.Close()
                    $ideaPlugin = $xml.'idea-plugin'
                    if ($ideaPlugin) {
                        $info.Id = [string]$ideaPlugin.id
                        $info.Name = [string]$ideaPlugin.name
                        $info.Version = [string]$ideaPlugin.version
                    }
                }
                $zip.Dispose()
            } catch {
                if (-not $info.Name) {
                    $info.Name = 'No se pudo leer plugin.xml dentro del jar'
                }
            }
        }
    }

    if (-not $info.Id) { $info.Id = $PluginDir.Name }
    if (-not $info.Name) { $info.Name = $PluginDir.Name }

    return [pscustomobject]$info
}

function Test-AiPlugin {
    param($Plugin)

    $haystack = (($Plugin.Folder, $Plugin.Id, $Plugin.Name) -join ' ').ToLowerInvariant()
    return Test-AiText -Text $haystack
}

function Test-AiText {
    param([string]$Text)

    foreach ($pattern in $aiPatterns) {
        if ($Text -match $pattern) {
            return $true
        }
    }
    return $false
}

if (Test-Path $output) {
    Remove-Item $output
}

"Auditoria de plugins de IntelliJ IDEA - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" |
    Out-File -FilePath $output -Encoding UTF8
Write-Line '============================================================'

if (-not (Test-Path $jbBase)) {
    Write-Line "No se encontro la carpeta JetBrains en $jbBase"
    exit 0
}

$ideDirs = @(Get-ChildItem -Path $jbBase -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '(?i)^(IntelliJIdea|IdeaIC|IdeaIU|IDEA)' })

if ($ideDirs.Count -eq 0) {
    Write-Line "No se encontraron carpetas de IntelliJ IDEA en $jbBase"
    exit 0
}

$totalPlugins = 0
$totalAiPlugins = 0

foreach ($ideDir in $ideDirs) {
    $pluginsDir = Join-Path $ideDir.FullName 'plugins'
    $disabledIds = @(Read-DisabledPluginIds -IdeDir $ideDir.FullName)

    Write-Line ''
    Write-Line '------------------------------------------------------------'
    Write-Line "IDE: $($ideDir.Name)"
    Write-Line "Ruta: $($ideDir.FullName)"
    Write-Line "Fichero disabled_plugins detectado: $($disabledIds.Count -gt 0)"

    if ($disabledIds.Count -gt 0) {
        Write-Line 'Plugins deshabilitados declarados por IntelliJ:'
        foreach ($disabledId in $disabledIds) {
            $disabledAiFlag = if (Test-AiText -Text $disabledId.ToLowerInvariant()) { ' [POSIBLE_IA]' } else { '' }
            Write-Line "  - $disabledId$disabledAiFlag"
        }
    } else {
        Write-Line 'Plugins deshabilitados declarados por IntelliJ: ninguno detectado'
    }

    if (-not (Test-Path $pluginsDir)) {
        Write-Line "No se encontro carpeta de plugins en $pluginsDir"
        continue
    }

    $plugins = @(Get-ChildItem -Path $pluginsDir -Directory -ErrorAction SilentlyContinue |
        ForEach-Object { Get-PluginInfo -PluginDir $_ } |
        Sort-Object Name, Id)

    Write-Line ''
    Write-Line "Plugins instalados por el usuario: $($plugins.Count)"

    foreach ($plugin in $plugins) {
        $totalPlugins++
        $isDisabled = $disabledIds -contains $plugin.Id -or $disabledIds -contains $plugin.Folder -or $disabledIds -contains $plugin.Name
        $state = if ($isDisabled) { 'DESHABILITADO' } else { 'HABILITADO' }
        $aiFlag = if (Test-AiPlugin -Plugin $plugin) { 'POSIBLE_IA' } else { 'NO_IA' }

        if ($aiFlag -eq 'POSIBLE_IA') {
            $totalAiPlugins++
        }

        Write-Line ("[{0}] [{1}] Nombre='{2}' Id='{3}' Version='{4}' Carpeta='{5}'" -f `
            $state, $aiFlag, $plugin.Name, $plugin.Id, $plugin.Version, $plugin.Folder)
    }
}

Write-Line ''
Write-Line '============================================================'
Write-Line "TOTAL PLUGINS INSTALADOS POR USUARIO: $totalPlugins"
Write-Line "TOTAL POSIBLES PLUGINS DE IA DETECTADOS: $totalAiPlugins"
Write-Line 'Patrones buscados para marcar POSIBLE_IA:'
Write-Line ($aiPatterns -join ', ')
Write-Line "Resultados guardados en el archivo: $output"
