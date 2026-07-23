import content from "@/shared/constants/content.json";
import { ImageKey } from "@/shared/constants/images.constants";
import ImageSlider from "@/shared/components/ImageSlider";

const SLIDE_KEYS: ImageKey[] = [
  "render1",
  "render2",
  "render3",
  "render4",
  "render5",
  "render6",
  "render7",
  "render8",
  "render9",
  "render10",
  "render11",
];

export default function Render3DSection() {
  const { render3d } = content.ubicacion;

  return (
    <ImageSlider
      id="render-3d"
      eyebrow={render3d.eyebrow}
      title={render3d.title}
      description={render3d.description}
      items={render3d.items}
      slideKeys={SLIDE_KEYS}
    />
  );
}