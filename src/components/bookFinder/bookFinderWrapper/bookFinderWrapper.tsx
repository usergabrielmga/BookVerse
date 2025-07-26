// BookFinderWrapper.tsx
import { useParams } from 'react-router-dom';
import BookFinder from '../bookFinder';

function BookFinderWrapper() {
    const { query } = useParams<{ query: string }>();
    return <BookFinder req={query || ''} />;
}

export default BookFinderWrapper;
