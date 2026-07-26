$fontPath = "c:\Users\Thuta_Dell\Documents\GitHub\asiabuddy-main\lib\pdf\fonts\NotoSansMyanmar-Regular.ttf"
$outputPath = "c:\Users\Thuta_Dell\Documents\GitHub\asiabuddy-main\lib\pdf\fonts\NotoSansMyanmar-Regular.base64.txt"

$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($fontPath))
$base64 | Out-File -FilePath $outputPath -Encoding ASCII

Write-Host "Font converted to base64 and saved to $outputPath"
Write-Host "Base64 length: $($base64.Length)"
