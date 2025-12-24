// src/types/phaseCard.ts

// Type for bullet point items from ACF repeater field
interface BulletPoint {
  text: string;
}

export interface PhaseCard {
  id: number;
  acf: {
    front_card_main_heading: string;
    front_card_subheading: string;
    back_card_title: string;
    back_card_button_text: string;
    front_card_icon: string;
    back_card_bullet_points: BulletPoint[];
    front_card_description: string;
    front_card_icon_alt: string;
  };
}