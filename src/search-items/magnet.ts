
export interface Magnet {
  name: string;
  size: number;
  tth: string;
}

export const parseMagnetLink = (text: string): Magnet | null => {
  if (text.length < 10) {
    return null;
  }

  let fname, fsize, hash;

  {
    const tokens = text.substring(8).split('&');
    let type, param;
    const hashes: any = {};
    for (const idx of tokens) {
      const pos = idx.indexOf('=');
      if (pos !== -1) {
        type = decodeURIComponent(idx.substring(0, pos));
        param = decodeURIComponent(idx.substring(pos + 1));
      } else {
        type = decodeURIComponent(idx);
        param = '';
      }

      if (param.length === 85 && param.startsWith('urn:bitprint:')) {
        hashes[type] = param.substring(46);
      } else if (param.length === 54 && param.startsWith('urn:tree:tiger:')) {
        hashes[type] = param.substring(15);
      } else if (param.length === 55 && param.startsWith('urn:tree:tiger/:')) {
        hashes[type] = param.substring(16);
      } else if (param.length === 59 && param.startsWith('urn:tree:tiger/1024:')) {
        hashes[type] = param.substring(20);
      } else if (type.length === 2 && type.startsWith('dn')) {
        fname = param;
      } else if (type.length === 2 && type.startsWith('xl')) {
        fsize = parseInt(param);
      }
    }

    if (hashes['xt']) {
      hash = hashes['xt'];
    } else if (hashes['xs']) {
      hash = hashes['xs'];
    } else if (hashes['as']) {
      hash = hashes['as'];
    }
  }

  if (!fname || !fsize || !hash) {
    return null;
  }

  return {
    name: fname,
    size: fsize,
    tth: hash,
  };
};
