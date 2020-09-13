
const extrawords = [ 
	'multisubs', 'multi', 'dvdrip', 'dvdr', 'real proper', 'proper', 'ultimate directors cut', 'directors cut', 'dircut', 'x264', 'pal', 'complete', 'limited', 'ntsc', 'bd25',
	'bd50', 'bdr', 'bd9', 'retail', 'bluray', 'nordic', '720p', '1080p', 'read nfo', 'dts', 'hdtv', 'pdtv', 'hddvd', 'repack', 'internal', 'custom', 'subbed', 'unrated', 'recut',
	'extended', 'dts51', 'finsub', 'swesub', 'dksub', 'nosub', 'remastered', '2disc', 'rf', 'fi', 'swe', 'stv', 'r5', 'festival', 'anniversary edition', 'bdrip', 'ac3', 'xvid',
	'ws', 'int' 
];

const yearReg = /((\[)?((19[0-9]{2})|(20[0-1][0-9]))|(s[0-9]([0-9])?(e|d)[0-9]([0-9])?)|(Season(\.)[0-9]([0-9])?)).*/;

export const cleanTitle = (searchTerm: string) => {
	let ret = searchTerm.toLocaleLowerCase();

	// Remove group name
	{
		const pos = ret.lastIndexOf('-');
		if (pos !== -1) {
			ret = ret.substr(0, pos);
		}
	}

	// Replace separator chars with spaces
	{
		ret = ret.replace(/\.|_/g, ' ');
	}


	// Remove words after year/episode
	{
		const match = ret.search(yearReg);
		if (match !== -1) {
			ret = ret.substr(0, match);
		}
	}

	// Remove extra words
	{
		ret += ' ';
		for (const extraWord of extrawords) {
			ret = ret.replace(` ${extraWord} `, ' ');
		}
	}

	//trim spaces from the end
	return ret.trim();
}


export const isDirectory = (fullPath: string): boolean => {
  return fullPath ? !!fullPath.match(/[\\\/]$/) : false;
};

export const getParentPath = (fullPath: string): string => {
  if (isDirectory(fullPath)) {
    return fullPath.replace(/[^\\\/]+[\\\/]$/, '');
  }

  return getFilePath(fullPath);
};

export const getLastDirectory = (fullPath: string): string => {
  const path = isDirectory(fullPath) ? fullPath : getParentPath(fullPath);
  const result = path.match(/([^\\\/]+)[\\\/]$/);
  return result ? result[1] : fullPath;
};

export const getFilePath = (fullPath: string): string => {
  return fullPath.replace(/[^\\\/]*$/, '');
};

const subDirReg = /^(((DVD|CD|DIS(K|C)).?([0-9](0-9)?))|Sample|Cover(s)?|.{0,5}Sub(s)?)$/i;

export const getReleaseDir = (path: string, separator = '/') => {
	if (path.length < 3) {
		return path;
	}

	// Get the directory to search for
	let i = path.endsWith(separator) ? path.length - 2 : path.length - 1;
	let j = 0;
	for (;;) {
		j = path.substr(0, i).lastIndexOf(separator);
		if (j === -1) {
			j = 0;
			break;
		}

		if (path.substr(j + 1, i - j).search(subDirReg) === -1) {
			j++;
			break;
		}

		i = j - 1;
	}

	return path.substr(j, i - j + 1);
};
