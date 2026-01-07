<?php
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Pfade
 * Build liegt in: wp-theme/dist/public/index.html
 */
$dist_dir   = trailingslashit(get_stylesheet_directory()) . 'dist/public/';
$dist_url   = trailingslashit(get_stylesheet_directory_uri()) . 'dist/public/';
$index_file = $dist_dir . 'index.html';

if (!file_exists($index_file)) {
  echo '<div style="padding:20px;font-family:Arial,sans-serif;">';
  echo '<h2>Build fehlt</h2>';
  echo '<p>Ich finde keine <code>dist/public/index.html</code> in deinem Theme.</p>';
  echo '<p>Erwartet: <code>' . esc_html($index_file) . '</code></p>';
  echo '<p>Bitte im Repo den Build nach <code>wp-theme/dist/public/</code> committen.</p>';
  echo '</div>';
  exit;
}

$html = file_get_contents($index_file);
if ($html === false) {
  echo '<div style="padding:20px;font-family:Arial,sans-serif;">Konnte dist/public/index.html nicht lesen.</div>';
  exit;
}

/**
 * 1) BASE-HREF in den <head> setzen (muss im HEAD stehen)
 * Damit relative Pfade wie "assets/..." korrekt auf dist/public/ zeigen.
 */
if (stripos($html, '<head') !== false) {
  $html = preg_replace(
    '/<head([^>]*)>/i',
    '<head$1>' . "\n" . '<base href="' . esc_url($dist_url) . '">' . "\n",
    $html,
    1
  );
}

/**
 * 2) Asset-Pfade fixen (wichtig, weil Vite oft /assets/... oder assets/... ausgibt)
 * Wir biegen alles sauber auf .../dist/public/assets/ um.
 */
$replacements = [
  'src="/assets/'    => 'src="' . $dist_url . 'assets/',
  'href="/assets/'   => 'href="' . $dist_url . 'assets/',
  'src="assets/'     => 'src="' . $dist_url . 'assets/',
  'href="assets/'    => 'href="' . $dist_url . 'assets/',
  'src="./assets/'   => 'src="' . $dist_url . 'assets/',
  'href="./assets/'  => 'href="' . $dist_url . 'assets/',
];

// einfache str_replace-Fixes
$html = str_replace(array_keys($replacements), array_values($replacements), $html);

// zusätzlich: srcset (z.B. srcset="assets/a.jpg 1x, assets/b.jpg 2x")
$html = preg_replace_callback('/\ssrcset="([^"]+)"/i', function ($m) use ($dist_url) {
  $val = $m[1];

  $val = preg_replace('/(^|,\s*)\/assets\//', '$1' . $dist_url . 'assets/', $val);
  $val = preg_replace('/(^|,\s*)\.?\/?assets\//', '$1' . $dist_url . 'assets/', $val);

  return ' srcset="' . $val . '"';
}, $html);

/**
 * 3) Platzhalter für WP Head/Footer einfügen
 */
$head_placeholder   = '<!--WP_HEAD_PLACEHOLDER-->';
$footer_placeholder = '<!--WP_FOOTER_PLACEHOLDER-->';

if (stripos($html, '</head>') !== false) {
  $html = preg_replace('/<\/head>/i', $head_placeholder . "\n</head>", $html, 1);
}
if (stripos($html, '</body>') !== false) {
  $html = preg_replace('/<\/body>/i', $footer_placeholder . "\n</body>", $html, 1);
}

/**
 * 4) WP Head/Footer sauber capturen (ohne eval)
 */
ob_start();
wp_head();
$wp_head_output = ob_get_clean();

ob_start();
wp_footer();
$wp_footer_output = ob_get_clean();

/**
 * 5) Platzhalter ersetzen
 */
$html = str_replace($head_placeholder, $wp_head_output, $html);
$html = str_replace($footer_placeholder, $wp_footer_output, $html);

/**
 * 6) Ausgabe
 */
echo $html;