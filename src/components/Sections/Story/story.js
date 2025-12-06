import { useState } from "react";
import useFetchData from "../../FetchData/useFetchData";
import './story.css';

const SectionStory = () => {
    const { data, loading, error } = useFetchData('https://api.mrh-store.com/api/ui');
    const [selectedStory, setSelectedStory] = useState(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const resData = Object.values(data.data.story);

    const showModal = () => {
        setSelectedStory(true);
    };

    const closeModal = () => {
        setSelectedStory(false);
    };

    return (
        <>
            {resData.map((story) => {
                return (
                    <section key={story.id} className="section-stories flex flex-col gap-4 my-5">
                        <button className='image_wrapper max-w-[65px] max-h-[65px] mx-auto flex items-center justify-center overflow-hidden' onClick={showModal}>
                            <span className='bg-white w-full h-full flex'>
                                <img src={story.thumbnail_image.url} />
                            </span>
                        </button>
                        <span className='story_title text-gray-500 text-center'>{story.title}</span>

                        <div className={`modal_container w-[60%] h-[500px] mx-auto bg-zinc-950 ${selectedStory ? 'active' : ''}`}>
                            <div className='modal-header flex items-center justify-between pt-4 px-4'>
                                <div className='flex items-center gap-3'>
                                    <img src={story.thumbnail_image.url} alt="فروشگاه ما" className='thumbnail-image cursor-pointer object-cover' />
                                    <span className='text-gray-400'>{story.title}</span>
                                </div>
                                <div>
                                    <span className='text-white close_modal cursor-pointer' onClick={closeModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </span>
                                </div>
                            </div>
                            <div className='browser-media-wrapper h-[80%]'>
                                <video controls title='فروشگاه ما' className='w-[100%] h-[100%]'>
                                    <source src={story.browser_media.url}></source>
                                </video>
                            </div>
                        </div>
                    </section >
                );
            })}
        </>
    )
};

export default SectionStory;
