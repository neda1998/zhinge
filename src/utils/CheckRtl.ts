export default function CheckRtl(lang: string | any): boolean {
    const rtlLangs = ['fa', 'ar', 'ku'];
    if (rtlLangs./* The `includes` method is used to check if an array includes a certain element. In
    this context, it is checking if the `lang` variable is included in the `rtlLangs`
    array. If `lang` is found in the `rtlLangs` array, the method will return `true`,
    indicating that the language is a right-to-left language. Otherwise, it will return
    `false`. */
    includes(lang))
        return true
    return false;
}