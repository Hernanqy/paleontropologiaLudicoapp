import ChapterScreen from "@/components/ChapterScreen";
import { recorrido } from "@/content/recorrido";

export default function ExtincionPage() {
 const chapter = recorrido.find((item) => item.id === "presente")!;

  return <ChapterScreen chapter={chapter} />;
}