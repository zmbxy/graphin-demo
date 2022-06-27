import { isEmpty } from 'lodash';
import { DOMParser } from 'xmldom';

const domParser = new DOMParser();

declare type Options = {
  scale?: number,
  id?: string,
  type?: string,
  width?: number,
  height?: number,
  css?: {
    [key: string]: any
  }
}

const defaultOptions: Partial<Options> = {
  scale: 1,
  type: 'PNG',
  width: 16,
  height: 16,
}

const svg2Base64 = (svg: string, options?: Options): string => {

  let targetSVG = svg;

  const { css } = {
    ...defaultOptions,
    ...options,
  }

  if (!isEmpty(css)) {
    targetSVG = appendDefs(svg, css);
  }

  return `data:image/svg+xml;base64,${window.btoa(targetSVG)}`;
}

const appendDefs = (source, css) => {
  const svg = domParser.parseFromString(source);

  const styleNode = svg.createElement('style');
  const svgNode = svg.getElementsByTagName('svg')[0];

  const cdata = svg.createCDATASection(css);

  styleNode.setAttribute('type', 'text/css');
  styleNode.appendChild(cdata);

  return svgNode.toString();
}

export default svg2Base64;
