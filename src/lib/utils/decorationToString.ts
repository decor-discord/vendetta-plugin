import { Decoration } from '../api';

export default (decoration: Decoration) => `decor_${decoration.animated ? 'a_' : ''}${decoration.hash}`;
