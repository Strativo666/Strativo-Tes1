Add-Content styles.css -Value "
.centered-logo { display: block !important; margin: 0 auto !important; }"

$indexContent = Get-Content index.html -Raw
if ($indexContent -match '(?s)<footer class="footer">.*?</footer>') {
    $footerMatch = $matches[0]
    $files = Get-ChildItem -Path . -Filter "*.html" | Where-Object { $_.Name -ne 'index.html' }
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        $content = $content -replace '(?s)<footer class="footer">.*?</footer>', $footerMatch
        Set-Content -Path $file.FullName -Value $content
    }
}

$serviceFiles = Get-ChildItem -Path . -Filter "service-*.html"
foreach ($file in $serviceFiles) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<img src="assets/logo([^"]+)" alt="([^"]+)" style="max-height: 80px; width: auto;">', '<img src="assets/logo$1" alt="$2" class="centered-logo" style="max-height: 80px; width: auto;">'
    Set-Content -Path $file.FullName -Value $content
}
