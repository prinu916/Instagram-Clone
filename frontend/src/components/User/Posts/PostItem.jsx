import { useEffect, useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { commentIcon, emojiIcon, likeIconOutline, saveIconFill, saveIconOutline, shareIcon } from '../../Home/SvgIcons';
import { likeFill } from '../../Navbar/SvgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deletePost, likePost, savePost } from '../../../actions/postAction';
import { Picker } from 'emoji-mart';
import { metaballsMenu } from '../SvgIcons';
import moment from 'moment';

const PostItem = ({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);

    const [open, setOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [likeEffect, setLikeEffect] = useState(false);

    const { user } = useSelector((state) => state.user);

    const IMAGE_URL = "http://localhost:4000";
    const getPostImageSrc = (imageUrl) => {
        if (!imageUrl) return "";
        return imageUrl.startsWith("http") ? imageUrl : `${IMAGE_URL}${imageUrl}`;
    };

    const handleLike = () => {
        setLiked(!liked);
        dispatch(likePost(_id));
    }

    const handleComment = (e) => {
        e.preventDefault();
        dispatch(addComment(_id, comment));
        setComment("");
    }

    const handleSave = () => {
        setSaved(!saved);
        dispatch(savePost(_id));
    }

    const handleDeletePost = () => {
        dispatch(deletePost(_id));
        setDeleteModal(false)
    }

    useEffect(() => {
        setLiked(likes?.some((id) => id === user._id))
    }, [likes]);

    useEffect(() => {
        setSaved(savedBy?.some((id) => id === user._id))
    }, [savedBy]);

    const setLike = () => {
        setLikeEffect(true)
        setTimeout(() => setLikeEffect(false), 500)

        if (liked) return;
        handleLike();
    }

    return (
        <>
            {/* GRID POST */}
            <div
                onClick={() => setOpen(true)}
                className="group w-full h-32 sm:h-72 max-h-72 flex justify-center items-center bg-gray-100 hover:bg-black cursor-pointer relative"
            >
                <img
                    draggable="false"
                    loading="lazy"
                    className="hover:opacity-75 group-hover:opacity-75 object-cover h-full w-full"
                    src={getPostImageSrc(image)}
                    alt="Post"
                />

                <div className="hidden group-hover:flex text-white absolute gap-4">
                    <span><FavoriteIcon /> {likes?.length}</span>
                    <span><ModeCommentIcon /> {comments?.length}</span>
                </div>
            </div>

            {/* MODAL */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth='xl'>
                <div className="flex sm:flex-row flex-col max-w-7xl">

                    {/* IMAGE */}
                    <div className="relative flex items-center justify-center bg-black sm:h-[90vh] w-full" onDoubleClick={setLike}>
                        <img
                            draggable="false"
                            className="object-contain h-full w-full"
                            src={getPostImageSrc(image)}
                            alt="post"
                        />

                        {likeEffect &&
                            <img
                                draggable="false"
                                height="80px"
                                className="likeEffect"
                                alt="heart"
                                src="https://img.icons8.com/ios-filled/2x/ffffff/like.png"
                            />
                        }
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex flex-col justify-between border w-full max-w-xl bg-white">

                        {/* HEADER */}
                        <div className="flex justify-between px-3 py-2 border-b items-center">
                            <div className="flex space-x-3 items-center">
                                <Link to={`/${postedBy.username}`}>
                                    <img className="w-10 h-10 rounded-full object-cover" src={postedBy.avatar} alt="avatar" />
                                </Link>
                                <Link to={`/${postedBy.username}`} className="text-sm font-semibold">
                                    {postedBy.username}
                                </Link>
                            </div>
                        </div>

                        {/* COMMENTS */}
                        <div className="p-4 flex-1 max-h-[63vh] overflow-y-auto">

                            <p className="text-sm whitespace-pre-line mb-3">{caption}</p>

                            {comments?.map((c) => (
                                <div className="flex items-start space-x-2 mb-3" key={c._id}>
                                    <Link to={`/${c.user}`}>
                                        <img className="w-8 h-8 rounded-full" src={c.user.avatar} alt="" />
                                    </Link>
                                    <div>
                                        <span className="font-semibold text-sm">{c.user.username}</span>
                                        <p className="text-sm">{c.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ACTIONS */}
                        <div className="border-t p-3">

                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <button onClick={handleLike}>
                                        {liked ? likeFill : likeIconOutline}
                                    </button>
                                    <button onClick={() => commentInput.current.focus()}>
                                        {commentIcon}
                                    </button>
                                    {shareIcon}
                                </div>

                                <button onClick={handleSave}>
                                    {saved ? saveIconFill : saveIconOutline}
                                </button>
                            </div>

                            <p className="text-sm font-semibold mt-2">{likes?.length} likes</p>
                            <p className="text-xs text-gray-500">{moment(createdAt).fromNow()}</p>

                            {/* COMMENT BOX */}
                            <form onSubmit={handleComment} className="flex mt-2 gap-2">
                                <input
                                    ref={commentInput}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 outline-none text-sm"
                                />
                                <button disabled={!comment.trim()} className="text-blue-500">
                                    Post
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default PostItem;