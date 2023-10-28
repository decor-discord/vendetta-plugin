import { FluxDispatcher } from "@vendetta/metro/common";

export default function subscribeToFluxDispatcher(event: string, callback: (data: any) => void) {
    FluxDispatcher.subscribe(event, callback)
    return () => void FluxDispatcher.unsubscribe(event, callback)
}
