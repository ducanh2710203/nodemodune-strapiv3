import DragDropManagerImpl from './DragDropManagerImpl';
export function createDragDropManager(backendFactory, globalContext, backendOptions, debugMode) {
    const manager = new DragDropManagerImpl(debugMode);
    const backend = backendFactory(manager, globalContext, backendOptions);
    manager.receiveBackend(backend);
    return manager;
}
