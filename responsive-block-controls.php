<?php
/**
 * Plugin Name:       Responsive Block Controls
 * Description:       Adds extra responsive design controls to the WordPress block editor
 * Version:           1.0.0
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

/**
 * Enqueue editor assets for the responsive block controls.
 */
function responsive_block_controls_enqueue_editor_assets() {
	$editor_assets = include plugin_dir_path( __FILE__ ) . 'build/editor.asset.php';

	wp_enqueue_script(
		'responsive-block-controls-editor',
		plugin_dir_url( __FILE__ ) . '/build/editor.js',
		$editor_assets['dependencies'],
		$editor_assets['version'],
		true
	);

	wp_enqueue_style(
		'responsive-block-controls-editor',
		plugin_dir_url( __FILE__ ) . 'build/editor.css',
		[],
		$editor_assets['version']
	);
}

add_action( 'enqueue_block_editor_assets', 'responsive_block_controls_enqueue_editor_assets' );

/**
 * Enqueue frontend styles for the responsive block controls.
 */
function responsive_block_controls_enqueue_assets() {
	$frontend_assets = include plugin_dir_path( __FILE__ ) . 'build/frontend.asset.php';

	wp_enqueue_style(
		'responsive-block-controls-frontend',
		plugin_dir_url( __FILE__ ) . 'build/frontend.css',
		[],
		$frontend_assets['version']
	);
}

add_action( 'enqueue_block_assets', 'responsive_block_controls_enqueue_assets' );

/**
 * Render the block with responsive styles.
 *
 * @param string $block_content The block content.
 * @param array  $block         The block attributes.
 *
 * @return string The updated block content with responsive styles applied.
 */
function responsive_block_controls_render_block( $block_content, $block ) {
	if ( empty( $block['attrs']['responsiveStyles'] ) ) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor( $block_content );
	$processor->next_tag();

	$style = '';

	foreach ( $block['attrs']['responsiveStyles'] as $breakpoint => $styles ) {
		foreach ( $styles['style']['padding'] as $direction => $value ) {
			if ( $value !== '0' ) {
				$value  = convert_css_preset_to_variable( $value );
				$style .= "--rbc-{$breakpoint}-padding-{$direction}: {$value};";
			}
		}

		foreach ( $styles['style']['margin'] as $direction => $value ) {
			if ( $value !== '0' ) {
				$value  = convert_css_preset_to_variable( $value );
				$style .= "--rbc-{$breakpoint}-margin-{$direction}: {$value};";
			}
		}
	}

	$existing_style = $processor->get_attribute( 'style' );

	if ( ! empty( $existing_style ) ) {
		$style = rtrim( $existing_style, ';' ) . '; ' . $style;
	}

	$processor->set_attribute( 'style', $style );
	$processor->add_class( 'has-style-rbc' );

	return $processor->get_updated_html();
}

add_action( 'render_block', 'responsive_block_controls_render_block', 10, 2 );

/**
 * Convert a CSS preset name to a CSS variable.
 * 
 * @param string $name The CSS preset name.
 * @param string $prefix The prefix for the CSS variable.
 * 
 * @return string The CSS variable name.
 */
function convert_css_preset_to_variable( $name, $prefix = 'wp' ) {
	if ( strpos( $name, 'var:' ) !== 0 ) {
		return $name;
	}

	$css_preset_clean = str_replace( 'var:', '', $name );
	$css_preset_parts = explode( '|', $css_preset_clean );

	$css_var = implode( '--', [ $prefix, ...$css_preset_parts ] );

	return "var(--{$css_var})";
}