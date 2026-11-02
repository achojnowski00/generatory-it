$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$iconDirectory = Join-Path (Split-Path -Parent $PSScriptRoot) 'icons'
New-Item -ItemType Directory -Path $iconDirectory -Force | Out-Null

foreach ($size in @(16, 32, 48, 128)) {
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $background = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#1b2a22'))
    $foreground = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#f5f3ee'))
    $accent = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#bba377'))
    $font = [System.Drawing.Font]::new('Georgia', 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $shape = [System.Drawing.Drawing2D.GraphicsPath]::new()
    try {
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.ScaleTransform($size / 40.0, $size / 40.0)
        $shape.AddArc(0, 0, 18, 18, 180, 90)
        $shape.AddArc(22, 0, 18, 18, 270, 90)
        $shape.AddArc(22, 22, 18, 18, 0, 90)
        $shape.AddArc(0, 22, 18, 18, 90, 90)
        $shape.CloseFigure()
        $graphics.FillPath($background, $shape)
        $graphics.DrawString('g', $font, $foreground, 6, -1, [System.Drawing.StringFormat]::GenericTypographic)
        $graphics.FillEllipse($accent, 29, 27, 4, 4)
        $bitmap.Save((Join-Path $iconDirectory "icon-$size.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $shape.Dispose()
        $font.Dispose()
        $accent.Dispose()
        $foreground.Dispose()
        $background.Dispose()
        $graphics.Dispose()
        $bitmap.Dispose()
    }
}
