<?php
/**
 * Plugin Name:       Responsive Block Controls
 * Description:       Adds extra responsive design controls to the WordPress block editor
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Zarko
 * Author URI:        https://zarko.dev
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       responsive-block-controls
 *
 * @package Responsive_Block_Controls
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function responsive_block_controls_enqueue_scripts() {
	$editor_assets = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'responsive-block-controls-script',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$editor_assets['dependencies'],
		$editor_assets['version'],
		true
	);
}

add_action( 'enqueue_block_editor_assets', 'responsive_block_controls_enqueue_scripts' );
