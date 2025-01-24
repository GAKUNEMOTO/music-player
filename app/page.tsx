"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { songs } from "@/data/song";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const currentSong = songs[currentSongIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="relative aspect-square mb-6 overflow-hidden rounded-lg shadow-2xl">
            <img
              src={currentSong.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{currentSong.title}</h2>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={handlePrevious}
            >
              <SkipBack className="h-6 w-6" />
            </Button>

            <Button
              onClick={togglePlayPause}
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={handleNext}
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-6 flex items-center">
            <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={handleVolumeChange}
            />
            <audio ref={audioRef} src={currentSong.musicUrl} onEnded={handleNext} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
