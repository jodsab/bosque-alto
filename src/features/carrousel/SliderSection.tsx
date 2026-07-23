import content from "@/shared/constants/content.json";
import { ImageKey } from "@/shared/constants/images.constants";
import ImageSlider from "@/shared/components/ImageSlider";

const SLIDE_KEYS: ImageKey[] = [
  "carrousel1",
  "carrousel2",
  "carrousel3",
  "carrousel4",
  "carrousel5",
  "carrousel6",
  "carrousel7",
  "carrousel8",
  "carrousel9",
  "carrousel10",
  "carrousel11",
  "carrousel12",
  "carrousel13",
  "carrousel14",
  "carrousel15",
  "carrousel16",
  "carrousel17",
  "carrousel18",
  "carrousel19",
];

export default function SliderSection() {
  const { carrousel } = content;

  return (
    <ImageSlider
      id="galeria"
      eyebrow={carrousel.eyebrow}
      title={carrousel.title}
      description={carrousel.description}
      items={carrousel.items}
      slideKeys={SLIDE_KEYS}
    />
  );
}