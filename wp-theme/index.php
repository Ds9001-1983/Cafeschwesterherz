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
  echo '</div>';
  exit;
}

$html = file_get_contents($index_file);
if ($html === false) {
  echo '<div style="padding:20px;font-family:Arial,sans-serif;">Konnte dist/public/index.html nicht lesen.</div>';
  exit;
}

/**
 * 1) <base href> DIREKT IN DEN <head>
 * Damit funktionieren alle relativen Pfade wie assets/...
 */
$html = preg_replace(
  '/<head([^>]*)>/i',
  '<head$1>' . "\n" . '<base href="' . esc_url($dist_url) . '">' . "\n",
  $html,
  1
);

/**
 * 2) wp_head() vor </head>
 */
$html = preg_replace(
  '/<\/head>/i',
  "<?php wp_head(); ?>\n</head>",
  $html,
  1
);

/**
 * 3) wp_footer() vor </body>
 */
$html = preg_replace(
  '/<\/body>/i',
  "<?php wp_footer(); ?>\n</body>",
  $html,
  1
);

/**
 * 4) PHP im HTML ausführen
 */
ob_start();
eval('?>' . $html);
$output = ob_get_clean();

echo $output;