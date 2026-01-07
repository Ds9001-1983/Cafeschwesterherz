<?php
if (!defined('ABSPATH')) {
  exit;
}

get_header();

/**
 * Pfade
 * Dein Build liegt in: wp-theme/dist/public/index.html
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
  get_footer();
  exit;
}

$html = file_get_contents($index_file);
if ($html === false) {
  echo '<div style="padding:20px;font-family:Arial,sans-serif;">Konnte dist/public/index.html nicht lesen.</div>';
  get_footer();
  exit;
}

/**
 * BASE-HREF setzen, damit relative Pfade wie "assets/..." korrekt auf das Theme zeigen
 * Beispiel: src="assets/x.jpg" -> /wp-content/themes/wp-theme/dist/public/assets/x.jpg
 */
if (stripos($html, '<head') !== false) {
  $html = preg_replace(
    '/<head([^>]*)>/i',
    '<head$1><base href="' . esc_url($dist_url) . '">',
    $html,
    1
  );
}

/**
 * 1) Asset-Pfade fixen
 * In deiner Struktur liegen die Assets unter: dist/public/assets/...
 * Vite baut je nach Config z.B. mit /assets/... oder assets/...
 */
$replacements = [
  'href="/assets/' => 'href="' . $dist_url . 'assets/',
  'src="/assets/'  => 'src="'  . $dist_url . 'assets/',
  'href="assets/'  => 'href="' . $dist_url . 'assets/',
  'src="assets/'   => 'src="'  . $dist_url . 'assets/',
];

$html = str_replace(array_keys($replacements), array_values($replacements), $html);

/**
 * 2) wp_head() vor </head> injizieren
 */
if (stripos($html, '</head>') !== false) {
  $html = preg_replace('/<\/head>/i', "<?php wp_head(); ?>\n</head>", $html, 1);
}

/**
 * 3) wp_footer() vor </body> injizieren
 */
if (stripos($html, '</body>') !== false) {
  $html = preg_replace('/<\/body>/i', "<?php wp_footer(); ?>\n</body>", $html, 1);
}

/**
 * 4) PHP im HTML ausführen (weil wir wp_head/wp_footer injizieren)
 */
ob_start();
eval('?>' . $html);
$output = ob_get_clean();

echo $output;

/**
 * Wir rufen bewusst NICHT get_footer(), weil wp_footer() bereits in der HTML steckt.
 * Und get_header() nur für Fallback genutzt wurde.
 */