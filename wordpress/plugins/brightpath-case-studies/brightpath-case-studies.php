<?php
/*
Plugin Name: BrightPath Case Studies
Description: Custom post type and ACF fields for case studies
Version: 1.0.0
Author: BrightPath Web Studio
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// Register Custom Post Type
add_action( 'init', function() {
    register_post_type( 'case_study', array(
        'label' => 'Case Studies',
        'labels' => array(
            'name' => 'Case Studies',
            'singular_name' => 'Case Study',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Case Study',
            'edit_item' => 'Edit Case Study',
            'view_item' => 'View Case Study',
            'all_items' => 'All Case Studies',
            'search_items' => 'Search Case Studies',
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 20,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'case_study',
    ));
});

// Register ACF Fields (only if ACF is active)
add_action( 'acf/init', function() {

    // Base Fields
    acf_add_local_field_group(array(
        'key' => 'group_case_study_base',
        'title' => 'Case Study Details',
        'fields' => array(
            array(
                'key' => 'field_cs_type',
                'label' => 'Case Study Type',
                'name' => 'case_study_type',
                'type' => 'select',
                'choices' => array(
                    'web' => 'Web Project',
                    'social-media' => 'Social Media',
                ),
                'default_value' => 'web',
            ),
            array(
                'key' => 'field_cs_client',
                'label' => 'Client Name',
                'name' => 'client_name',
                'type' => 'text',
            ),
            array(
                'key' => 'field_cs_industry',
                'label' => 'Industry',
                'name' => 'industry',
                'type' => 'text',
            ),
            array(
                'key' => 'field_cs_category',
                'label' => 'Category',
                'name' => 'category',
                'type' => 'text',
            ),
            array(
                'key' => 'field_cs_description',
                'label' => 'Short Description',
                'name' => 'short_description',
                'type' => 'textarea',
                'rows' => 3,
            ),
            array(
                'key' => 'field_cs_featured',
                'label' => 'Featured Image',
                'name' => 'featured_image',
                'type' => 'image',
                'return_format' => 'url',
            ),
            array(
                'key' => 'field_cs_hover',
                'label' => 'Hover Image',
                'name' => 'hover_image',
                'type' => 'image',
                'return_format' => 'url',
            ),
            array(
                'key' => 'field_cs_overview',
                'label' => 'Overview',
                'name' => 'overview',
                'type' => 'wysiwyg',
            ),
            array(
                'key' => 'field_cs_tags',
                'label' => 'Tags',
                'name' => 'tags',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => 'Add Tag',
                'sub_fields' => array(
                    array(
                        'key' => 'field_cs_tag',
                        'label' => 'Tag',
                        'name' => 'tag',
                        'type' => 'text',
                    ),
                ),
            ),
            array(
                'key' => 'field_cs_goals',
                'label' => 'Goals',
                'name' => 'goals',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => 'Add Goal',
                'sub_fields' => array(
                    array(
                        'key' => 'field_cs_goal',
                        'label' => 'Goal',
                        'name' => 'goal',
                        'type' => 'text',
                    ),
                ),
            ),
            array(
                'key' => 'field_cs_deliverables',
                'label' => 'Deliverables',
                'name' => 'deliverables',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Add Deliverable',
                'sub_fields' => array(
                    array(
                        'key' => 'field_cs_del_title',
                        'label' => 'Title',
                        'name' => 'title',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_cs_del_desc',
                        'label' => 'Description',
                        'name' => 'description',
                        'type' => 'textarea',
                    ),
                ),
            ),
            array(
                'key' => 'field_cs_process',
                'label' => 'Process Steps',
                'name' => 'process_steps',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Add Step',
                'sub_fields' => array(
                    array(
                        'key' => 'field_cs_step_num',
                        'label' => 'Step Number',
                        'name' => 'step_number',
                        'type' => 'number',
                    ),
                    array(
                        'key' => 'field_cs_step_title',
                        'label' => 'Title',
                        'name' => 'title',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_cs_step_desc',
                        'label' => 'Description',
                        'name' => 'description',
                        'type' => 'textarea',
                    ),
                ),
            ),
            array(
                'key' => 'field_cs_results',
                'label' => 'Results',
                'name' => 'results',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => 'Add Result',
                'sub_fields' => array(
                    array(
                        'key' => 'field_cs_result',
                        'label' => 'Result',
                        'name' => 'result',
                        'type' => 'text',
                    ),
                ),
            ),
            array(
                'key' => 'field_cs_quote',
                'label' => 'Testimonial Quote',
                'name' => 'testimonial_quote',
                'type' => 'textarea',
            ),
            array(
                'key' => 'field_cs_author',
                'label' => 'Testimonial Author',
                'name' => 'testimonial_author',
                'type' => 'text',
            ),
            array(
                'key' => 'field_cs_role',
                'label' => 'Testimonial Role',
                'name' => 'testimonial_role',
                'type' => 'text',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'case_study',
                ),
            ),
        ),
    ));

    // Social Media Fields
    acf_add_local_field_group(array(
        'key' => 'group_social_media',
        'title' => 'Social Media Details',
        'fields' => array(
            array(
                'key' => 'field_sm_platforms',
                'label' => 'Platforms',
                'name' => 'platforms',
                'type' => 'checkbox',
                'choices' => array(
                    'instagram' => 'Instagram',
                    'facebook' => 'Facebook',
                    'tiktok' => 'TikTok',
                    'youtube' => 'YouTube',
                    'linkedin' => 'LinkedIn',
                    'twitter' => 'Twitter/X',
                ),
            ),
            array(
                'key' => 'field_sm_period',
                'label' => 'Campaign Period',
                'name' => 'campaign_period',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_frequency',
                'label' => 'Post Frequency',
                'name' => 'post_frequency',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_impressions',
                'label' => 'Impressions',
                'name' => 'impressions',
                'type' => 'text',
                'instructions' => 'e.g., "163" or "2.5M+"',
            ),
            array(
                'key' => 'field_sm_accounts_reached',
                'label' => 'Accounts Reached',
                'name' => 'accounts_reached',
                'type' => 'text',
                'instructions' => 'e.g., "42" or "850K+"',
            ),
            array(
                'key' => 'field_sm_non_follower_reach',
                'label' => 'Non-Follower Reach %',
                'name' => 'non_follower_reach',
                'type' => 'text',
                'instructions' => 'e.g., "86.4%"',
            ),
            array(
                'key' => 'field_sm_reporting_period',
                'label' => 'Reporting Period',
                'name' => 'reporting_period',
                'type' => 'text',
                'instructions' => 'e.g., "Oct 17 – Jan 14"',
            ),
            array(
                'key' => 'field_sm_reach',
                'label' => 'Reach (Legacy)',
                'name' => 'reach',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_engagement',
                'label' => 'Engagement Rate',
                'name' => 'engagement',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_followers',
                'label' => 'Followers',
                'name' => 'followers',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_growth',
                'label' => 'Growth',
                'name' => 'growth',
                'type' => 'text',
            ),
            array(
                'key' => 'field_sm_profile_visits',
                'label' => 'Profile Visits',
                'name' => 'profile_visits',
                'type' => 'text',
                'instructions' => 'e.g., "23"',
            ),
            array(
                'key' => 'field_sm_link_taps',
                'label' => 'External Link Taps',
                'name' => 'link_taps',
                'type' => 'text',
                'instructions' => 'e.g., "2"',
            ),
            array(
                'key' => 'field_sm_samples',
                'label' => 'Content Samples',
                'name' => 'content_samples',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Add Sample',
                'sub_fields' => array(
                    array(
                        'key' => 'field_sm_sample_type',
                        'label' => 'Type',
                        'name' => 'content_type',
                        'type' => 'select',
                        'choices' => array(
                            'image' => 'Image',
                            'video' => 'Video',
                        ),
                    ),
                    array(
                        'key' => 'field_sm_sample_file',
                        'label' => 'File',
                        'name' => 'file',
                        'type' => 'file',
                        'return_format' => 'url',
                    ),
                    array(
                        'key' => 'field_sm_sample_thumb',
                        'label' => 'Thumbnail',
                        'name' => 'thumbnail',
                        'type' => 'image',
                        'return_format' => 'url',
                    ),
                    array(
                        'key' => 'field_sm_sample_alt',
                        'label' => 'Alt Text',
                        'name' => 'alt_text',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_sm_sample_caption',
                        'label' => 'Caption',
                        'name' => 'caption',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_sm_sample_platform',
                        'label' => 'Platform',
                        'name' => 'platform',
                        'type' => 'select',
                        'choices' => array(
                            'instagram' => 'Instagram',
                            'facebook' => 'Facebook',
                            'tiktok' => 'TikTok',
                            'youtube' => 'YouTube',
                        ),
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'case_study',
                ),
            ),
        ),
        'menu_order' => 1,
    ));

    // Web Project Fields
    acf_add_local_field_group(array(
        'key' => 'group_web_project',
        'title' => 'Web Project Details',
        'fields' => array(
            array(
                'key' => 'field_wp_url',
                'label' => 'Live Website URL',
                'name' => 'live_url',
                'type' => 'url',
            ),
            array(
                'key' => 'field_wp_speed',
                'label' => 'Page Speed',
                'name' => 'page_speed',
                'type' => 'text',
            ),
            array(
                'key' => 'field_wp_screenshots',
                'label' => 'Screenshots',
                'name' => 'screenshots',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Add Screenshot',
                'sub_fields' => array(
                    array(
                        'key' => 'field_wp_ss_label',
                        'label' => 'Label',
                        'name' => 'label',
                        'type' => 'text',
                    ),
                    array(
                        'key' => 'field_wp_ss_before',
                        'label' => 'Before Image',
                        'name' => 'before_image',
                        'type' => 'image',
                        'return_format' => 'url',
                    ),
                    array(
                        'key' => 'field_wp_ss_after',
                        'label' => 'After Image',
                        'name' => 'after_image',
                        'type' => 'image',
                        'return_format' => 'url',
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'case_study',
                ),
            ),
        ),
        'menu_order' => 2,
    ));
});

// REST API Endpoint
add_action( 'rest_api_init', function() {
    register_rest_route( 'brightpath/v1', '/case-studies', array(
        'methods' => 'GET',
        'callback' => function() {
            $posts = get_posts(array(
                'post_type' => 'case_study',
                'posts_per_page' => -1,
                'post_status' => 'publish',
            ));

            $results = array();
            foreach ( $posts as $post ) {
                $acf = function_exists('get_fields') ? get_fields($post->ID) : array();
                $results[] = array(
                    'id' => $post->ID,
                    'slug' => $post->post_name,
                    'title' => $post->post_title,
                    'acf' => $acf ? $acf : array(),
                );
            }
            return $results;
        },
        'permission_callback' => '__return_true',
    ));
});
