import { Store } from 'redux';
import { State } from './reducers';
import { DragDropMonitor, Listener, Unsubscribe, XYCoord, HandlerRegistry, Identifier } from './interfaces';
export default class DragDropMonitorImpl implements DragDropMonitor {
    private store;
    readonly registry: HandlerRegistry;
    constructor(store: Store<State>, registry: HandlerRegistry);
    subscribeToStateChange(listener: Listener, options?: {
        handlerIds: string[] | undefined;
    }): Unsubscribe;
    subscribeToOffsetChange(listener: Listener): Unsubscribe;
    canDragSource(sourceId: string | undefined): boolean;
    canDropOnTarget(targetId: string | undefined): boolean;
    isDragging(): boolean;
    isDraggingSource(sourceId: string | undefined): boolean;
    isOverTarget(targetId: string | undefined, options?: {
        shallow: boolean;
    }): boolean;
    getItemType(): Identifier;
    getItem(): any;
    getSourceId(): string | null;
    getTargetIds(): string[];
    getDropResult(): any;
    didDrop(): boolean;
    isSourcePublic(): boolean | null;
    getInitialClientOffset(): XYCoord | null;
    getInitialSourceClientOffset(): XYCoord | null;
    getClientOffset(): XYCoord | null;
    getSourceClientOffset(): XYCoord | null;
    getDifferenceFromInitialOffset(): XYCoord | null;
}
