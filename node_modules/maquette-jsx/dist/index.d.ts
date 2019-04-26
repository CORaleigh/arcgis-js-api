import { VNode, VNodeChild, VNodeProperties } from 'maquette';
declare global  {
    function jsx(tagName: string, properties: VNodeProperties | null, ...children: (VNode | string)[]): VNode;
    namespace JSX {
        interface IntrinsicElements {
            [tagName: string]: VNodeProperties;
        }
        type Element = VNode;
    }
}
export declare let jsx: (tagName: string, properties: VNodeProperties | null, ...childNodes: VNodeChild[]) => VNode;
/**
 * Call this function before executing any JSX formatted code. This function makes the window.jsx function available.
 */
export declare let enableGlobalJsx: () => void;
