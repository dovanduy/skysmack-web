write-host "`n----------------------------"
write-host "Nodejs check"
write-host "----------------------------"

if (Get-Command node -errorAction SilentlyContinue) {
    $node_installed = (node -v)
}

if(-Not  $node_installed) {
    $node_version = "10.15.3"
    $node_url = "https://nodejs.org/dist/v$node_version/node-v$node_version-x64.msi"

    $filename = "node-v$node_version-x64.msi"
    $node_msi = "$PSScriptRoot\$filename" # Note: $PSScriptRoot is a global powershell variable

    $download_node = $TRUE

    if (Test-Path $node_msi) {
        $confirmation = read-host "Local $filename file detected. Do you want to use it ? [Y/n]"
        if ($confirmation -eq "n") {
            $download_node = $FALSE
        }
    }

    if ($download_node) {
        write-host "Downloading nodejs"
        write-host "url : $node_url"
        $start_time = Get-Date
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($node_url, $node_msi)
        write-Output "$filename downloaded"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "using the existing node.msi file"
    }

    write-host "`n----------------------------"
    write-host "Installing nodejs "
    write-host "----------------------------`n"

    write-host "Running $node_msi"
    Start-Process $node_msi -Wait

    write-host "Removing nodejs msi file"
    Remove-Item -path "$PSScriptRoot\*" -include *.msi
}

if($node_installed) {
    write-host "NodeJs is installed. Continuing..."
}

