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
 * 2) Platzhalter für WP Head/Footer einfügen
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
 * 3) WP Head/Footer sauber capturen (ohne eval)
 */
ob_start();
wp_head();
$wp_head_output = ob_get_clean();

ob_start();
wp_footer();
$wp_footer_output = ob_get_clean();

/**
 * 4) Platzhalter ersetzen
 */
$html = str_replace($head_placeholder, $wp_head_output, $html);
$html = str_replace($footer_placeholder, $wp_footer_output, $html);

/**
 * 5) Ausgabe
 */
echo $html;