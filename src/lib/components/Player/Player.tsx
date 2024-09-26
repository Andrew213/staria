import cn from 'classnames';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';

import { PauseIcon, PlayIcon, VideoPlayButton } from '@/assets/icons';

interface Props {
  url: string;
  autoplay?: boolean;
  poster?: string;
  rootClassnames?: string;
  previewMode?: boolean;
  onClick?: () => void;
  overlayClasses?: string;
}

export function Player({ url, autoplay, poster, rootClassnames, onClick, previewMode, overlayClasses }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [isControlVisible, setIsControlVisible] = useState(true);

  const handleControlClick = (control: 'play' | 'pause') => {
    const videoEl = videoRef.current;

    if (!videoEl) {
      return;
    }

    if (control === 'play') {
      void videoEl.play();
      setPlaying(true);
      setTimeout(() => setIsControlVisible(false), 300);
      setVideoTime(videoEl.duration);
    } else {
      videoEl.pause();
      setIsControlVisible(true);
      setPlaying(false);
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLElement>) => {
    const progressEl = progressRef.current;
    const videoEl = videoRef.current;

    if (!progressEl || !videoEl) {
      return;
    }

    const progressWidth = progressEl.offsetWidth;
    const cursorX = event.pageX - progressEl.getBoundingClientRect().left;
    videoEl.currentTime = videoEl.duration * (cursorX / progressWidth);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }
  };

  const handleProgress = () => {
    const videoEl = videoRef.current;

    if (!videoEl?.buffered) {
      return;
    }

    if (videoEl.duration > 0) {
      setBuffer((videoEl.currentTime / videoEl.duration) * 100);
    }
  };

  const handlePlay = () => {
    if (onClick) {
      onClick();
    } else {
      handleControlClick('play');
    }
  };

  const handlePause = () => {
    handleControlClick('pause');
  };

  const currentTimeText = useMemo(
    () => Math.floor(currentTime / 60) + ':' + ('0' + Math.floor(currentTime % 60)).slice(-2),
    [currentTime],
  );

  const videoTimeText = useMemo(
    () => Math.floor(videoTime / 60) + ':' + ('0' + Math.floor(videoTime % 60)).slice(-2),
    [videoTime],
  );

  return (
    <div
      className={cn(
        rootClassnames,
        'group relative h-full w-full overflow-hidden rounded-2 bg-white p-2 lg:rounded-4 lg:p-6',
      )}
    >
      <video
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onClick={() => (onClick ? onClick() : playing ? handleControlClick('pause') : handleControlClick('play'))}
        ref={videoRef}
        className="size-full max-h-full max-w-full rounded-2 object-cover lg:rounded-4"
        src={poster ? url : `${url}#t=0.1`}
        autoPlay={autoplay}
        poster={poster}
        playsInline
      />
      {!previewMode && isControlVisible && (
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 px-7 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:px-16 lg:py-12',
            { '!opacity-0': playing },
          )}
        >
          <div className="flex items-center gap-4 lg:gap-6">
            {playing ? (
              <div className="size-3 cursor-pointer lg:size-8" onClick={() => handleControlClick('pause')}>
                <PauseIcon />
              </div>
            ) : (
              <div
                className="size-3 cursor-pointer lg:size-8"
                onClick={() => (onClick ? onClick() : handleControlClick('play'))}
              >
                <PlayIcon />
              </div>
            )}

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-2 grow cursor-pointer overflow-hidden rounded-3 bg-white/30 lg:h-6"
            >
              <div className="absolute top-0 size-full rounded-3 bg-white/50" style={{ left: `${buffer - 100}%` }} />
              <div className="absolute top-0 size-full rounded-3 bg-white" style={{ left: `${progress - 100}%` }} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs font-semibold text-white lg:pt-1 lg:text-md">
            <p>{currentTimeText}</p>
            <p>{videoTimeText}</p>
          </div>
        </div>
      )}

      {previewMode && (
        <div
          onClick={() => onClick?.()}
          className={cn('absolute inset-0 flex items-center justify-center', overlayClasses)}
        >
          <div className="w-12 cursor-pointer text-white lg:w-20">
            <VideoPlayButton />
          </div>
        </div>
      )}
    </div>
  );
}
