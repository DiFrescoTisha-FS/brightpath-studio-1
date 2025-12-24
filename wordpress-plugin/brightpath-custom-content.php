<?php
/**
 * Plugin Name: BrightPath Custom Content
 * Description: Registers Custom Post Types and ACF Fields for BrightPath Web Studio
 * Version: 1.0.0
 * Author: BrightPath Web Studio
 * Text Domain: brightpath
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * =====================================================
 * REGISTER CUSTOM POST TYPES
 * =====================================================
 */

function brightpath_register_post_types() {

    // Phase Cards CPT
    register_post_type('phase-card', array(
        'labels' => array(
            'name'               => 'Phase Cards',
            'singular_name'      => 'Phase Card',
            'menu_name'          => 'Phase Cards',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Phase Card',
            'edit_item'          => 'Edit Phase Card',
            'new_item'           => 'New Phase Card',
            'view_item'          => 'View Phase Card',
            'search_items'       => 'Search Phase Cards',
            'not_found'          => 'No phase cards found',
            'not_found_in_trash' => 'No phase cards found in trash',
        ),
        'public'              => true,
        'has_archive'         => true,
        'show_in_rest'        => true,  // Important for REST API access
        'rest_base'           => 'phase-card',
        'menu_icon'           => 'dashicons-grid-view',
        'supports'            => array('title', 'thumbnail', 'custom-fields'),
        'capability_type'     => 'post',
    ));

    // Reviews CPT
    register_post_type('reviews', array(
        'labels' => array(
            'name'               => 'Reviews',
            'singular_name'      => 'Review',
            'menu_name'          => 'Reviews',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Review',
            'edit_item'          => 'Edit Review',
            'new_item'           => 'New Review',
            'view_item'          => 'View Review',
            'search_items'       => 'Search Reviews',
            'not_found'          => 'No reviews found',
            'not_found_in_trash' => 'No reviews found in trash',
        ),
        'public'              => true,
        'has_archive'         => true,
        'show_in_rest'        => true,  // Important for REST API access
        'rest_base'           => 'reviews',
        'menu_icon'           => 'dashicons-star-filled',
        'supports'            => array('title', 'thumbnail', 'custom-fields'),
        'capability_type'     => 'post',
    ));
}
add_action('init', 'brightpath_register_post_types');


/**
 * =====================================================
 * REGISTER ACF FIELD GROUPS
 * =====================================================
 */

function brightpath_register_acf_fields() {

    // Check if ACF is active
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    // =====================================================
    // PHASE CARD FIELDS
    // =====================================================
    acf_add_local_field_group(array(
        'key' => 'group_phase_card_fields',
        'title' => 'Phase Card Details',
        'fields' => array(
            // Front Card Section
            array(
                'key' => 'field_front_card_tab',
                'label' => 'Front Card',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
            ),
            array(
                'key' => 'field_front_card_main_heading',
                'label' => 'Main Heading',
                'name' => 'front_card_main_heading',
                'type' => 'text',
                'required' => 1,
                'instructions' => 'The main heading displayed on the front of the card (e.g., "Discovery")',
            ),
            array(
                'key' => 'field_front_card_subheading',
                'label' => 'Subheading',
                'name' => 'front_card_subheading',
                'type' => 'text',
                'instructions' => 'A short subheading (e.g., "Phase 1")',
            ),
            array(
                'key' => 'field_front_card_description',
                'label' => 'Description',
                'name' => 'front_card_description',
                'type' => 'textarea',
                'rows' => 3,
                'instructions' => 'Brief description shown on the front of the card',
            ),
            array(
                'key' => 'field_front_card_icon',
                'label' => 'Icon',
                'name' => 'front_card_icon',
                'type' => 'image',
                'return_format' => 'url',
                'preview_size' => 'thumbnail',
                'instructions' => 'Icon image for the front of the card',
            ),
            array(
                'key' => 'field_front_card_icon_alt',
                'label' => 'Icon Alt Text',
                'name' => 'front_card_icon_alt',
                'type' => 'text',
                'instructions' => 'Alt text for the icon (for accessibility)',
            ),

            // Back Card Section
            array(
                'key' => 'field_back_card_tab',
                'label' => 'Back Card',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
            ),
            array(
                'key' => 'field_back_card_title',
                'label' => 'Back Card Title',
                'name' => 'back_card_title',
                'type' => 'text',
                'instructions' => 'Title shown on the back of the card',
            ),
            array(
                'key' => 'field_back_card_bullet_points',
                'label' => 'Bullet Points',
                'name' => 'back_card_bullet_points',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => 'Add Bullet Point',
                'instructions' => 'List of bullet points shown on the back of the card',
                'sub_fields' => array(
                    array(
                        'key' => 'field_bullet_point_text',
                        'label' => 'Text',
                        'name' => 'text',
                        'type' => 'text',
                    ),
                ),
            ),
            array(
                'key' => 'field_back_card_button_text',
                'label' => 'Button Text',
                'name' => 'back_card_button_text',
                'type' => 'text',
                'default_value' => 'Learn More',
                'instructions' => 'Text for the button on the back of the card',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'phase-card',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => true,
        'show_in_rest' => true,
    ));

    // =====================================================
    // REVIEWS FIELDS
    // =====================================================
    acf_add_local_field_group(array(
        'key' => 'group_review_fields',
        'title' => 'Review Details',
        'fields' => array(
            array(
                'key' => 'field_reviewer_name',
                'label' => 'Reviewer Name',
                'name' => 'reviewer_name',
                'type' => 'text',
                'required' => 1,
                'instructions' => 'Full name of the reviewer',
            ),
            array(
                'key' => 'field_review_text',
                'label' => 'Review Text',
                'name' => 'review_text',
                'type' => 'textarea',
                'required' => 1,
                'rows' => 4,
                'instructions' => 'The main review/testimonial text',
            ),
            array(
                'key' => 'field_rating',
                'label' => 'Rating',
                'name' => 'rating',
                'type' => 'number',
                'required' => 1,
                'min' => 1,
                'max' => 5,
                'default_value' => 5,
                'instructions' => 'Star rating from 1 to 5',
            ),
            array(
                'key' => 'field_client_headshot',
                'label' => 'Client Headshot',
                'name' => 'client_headshot',
                'type' => 'image',
                'return_format' => 'array',
                'preview_size' => 'thumbnail',
                'instructions' => 'Photo of the reviewer (optional)',
            ),
            array(
                'key' => 'field_review_date',
                'label' => 'Review Date',
                'name' => 'review_date',
                'type' => 'date_picker',
                'display_format' => 'F j, Y',
                'return_format' => 'Y-m-d',
                'instructions' => 'Date of the review',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'reviews',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => true,
        'show_in_rest' => true,
    ));
}
add_action('acf/init', 'brightpath_register_acf_fields');


/**
 * =====================================================
 * EXPOSE ACF FIELDS IN REST API
 * =====================================================
 */

function brightpath_add_acf_to_rest_api() {
    // Add ACF fields to phase-card REST API response
    register_rest_field('phase-card', 'acf', array(
        'get_callback' => function($post) {
            return get_fields($post['id']);
        },
        'schema' => null,
    ));

    // Add ACF fields to reviews REST API response
    register_rest_field('reviews', 'acf', array(
        'get_callback' => function($post) {
            return get_fields($post['id']);
        },
        'schema' => null,
    ));
}
add_action('rest_api_init', 'brightpath_add_acf_to_rest_api');
