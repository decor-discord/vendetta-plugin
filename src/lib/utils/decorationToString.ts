import { Decoration } from '../api';

export default (decoration: Decoration) => ({
    asset: `decor_${decoration.animated ? 'a_' : ''}${decoration.hash}`,
    skuId: "0"
});