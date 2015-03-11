function Color() { }

Color.colorCode = function(red, green, blue) {
    red = Color.normalize(red);
    green = Color.normalize(green);
    blue = Color.normalize(blue);

    return '#' + Color.pad(red.toString(16)) + Color.pad(green.toString(16)) + Color.pad(blue.toString(16));
}

Color.pad = function(string) {
    return string.length > 1 ? string.toUpperCase() : "0" + string.toUpperCase();
}

Color.normalize=function(color) {
    return (color < 1.0 && color > 0.0) ? Math.floor(color * 255) : color;
}

