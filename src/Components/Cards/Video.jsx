import React from 'react'

import { useAxios } from '../hooks/MainAxios';

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData, loading, error } = useAxios(`/${media_type}/${data?.id}/videos`);

  if (loading) {
    return <div>جاري تحميل الفيديو...</div>;
  }

  if (error) {
    return <div>حدث خطأ أثناء تحميل الفيديو: {error.message}</div>;
  }

  const videoKey = videoData?.results?.find(video => video.site === "YouTube")?.key;

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 opacity-90 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button onClick={close} className="absolute -right-1 -top-0 text-3xl z-50">
          X
        </button>

        {videoKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className='text-3xl text-center mt-50'>There is no video available</div>
        )}
      </div>
    </section>
  );
}

export default VideoPlay;
