Add-Type -AssemblyName System.Drawing

function New-Icon([string]$Path, [int]$Size) {
  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $g.Clear([System.Drawing.Color]::FromArgb(197, 17, 21))
  $fontSize = [Math]::Max(10, [int]($Size * 0.45))
  $font = New-Object System.Drawing.Font "Arial", $fontSize, ([System.Drawing.FontStyle]::Bold)
  $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = "Center"
  $sf.LineAlignment = "Center"
  $rect = New-Object System.Drawing.RectangleF 0, 0, $Size, $Size
  $g.DrawString("P", $font, $brush, $rect, $sf)
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $font.Dispose()
  $brush.Dispose()
}

$dir = "e:\IT\PROFISmy\Profis\public"
New-Icon (Join-Path $dir "favicon-32.png") 32
New-Icon (Join-Path $dir "apple-touch-icon.png") 180
New-Icon (Join-Path $dir "logo192.png") 192
New-Icon (Join-Path $dir "logo512.png") 512
Copy-Item (Join-Path $dir "favicon-32.png") (Join-Path $dir "favicon.png") -Force
Write-Output "icons ok"
Get-ChildItem $dir | Select-Object Name, Length | Format-Table -AutoSize
