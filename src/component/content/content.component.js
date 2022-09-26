import ArabicAya from '../arabic-aya/arabic-aya.component';
import EnglishAya from '../english-aya/english-aya.component';
import DefinitionAya from '../definition-aya/definition-aya.component';
import InputItem from '../input-item/input-item.component';

import { useState, useEffect } from 'react';
import './content.styles.css'

const Content = () => {
    const [ayaRondom, setayaRondom] = useState(1);
    const [arText, setarText] = useState('');
    const [enText, setenText] = useState('');
    const [surahAndAyah, setsurahAndAyah] = useState('');


    const shuffleOnClick = () => {
        let ayah = Math.floor(Math.random() * 6236) + 1;
        setayaRondom(ayah);
        console.log('===> ayaNumber: ', ayah);
    }

    const getData = async () => {
        let ayah = ayaRondom;
        let url = "https://api.alquran.cloud/ayah/" + ayah + "/en.asad";
        let urlArabic = "https://api.alquran.cloud/ayah/" + ayah;
        let surah;
        let ayahNumber;
        let surahAndAyahReceived;

        console.log('===> arabic url: ', urlArabic);
        console.log('===> english url: ', url);

        await fetch(urlArabic)
            .then(response => response.json())
            .then(data => setarText(data.data.text))
            .catch((jqXHR, textStatus, errorThrown) => console.log("Error arabe: ", textStatus));

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setenText(data.data.text);
                surah = data.data.surah.englishName;
                ayahNumber = data.data.surah.numberOfAyahs;
                surahAndAyahReceived = surah + " : " + ayahNumber;
                setsurahAndAyah(surahAndAyahReceived);

                console.log("arabic data === > ", arText);
                console.log("english data === > ", enText);
                console.log("Surah ===> ", surah);
                console.log("Ayah number ===> ", ayahNumber);
                console.log("success");
            }).catch((jqXHR, textStatus, errorThrown) => {
                console.log('Error english: ' + textStatus);
            });

        // $.getJSON( urlArabic, function(data) {
        //   setarText(data.data.text);
        //   document.getElementById("arabicVerseText").innerHTML = arText;
        //   console.log(arText);
        // });

        // $.getJSON(url, function (data) {
        //     console.log(data);
        //     setenText(data.data.text);
        //     surah = data.data.surah.englishName;
        //     ayahNumber = data.data.surah.numberOfAyahs;
        //     setsurahAndAyah(surah + " : " + ayahNumber);
        //     document.getElementById("verseText").innerHTML = enText;
        //     document.getElementById("surahAndAyah").innerHTML = surahAndAyah;
        //     console.log(enText);
        //     console.log(surah);
        //     console.log(ayahNumber);
        //     console.log("success");
        // })
        //     .done(function () {
        //         console.log("second success");
        //     })
        //     .fail(function (jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })
        //     .always(function () {
        //         console.log("complete");
        //     });
    }

    useEffect(() => {
        getData();
    });


    const tweetOnClick = () => {
        var tweetLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + '"' + enText + '" QS' + surahAndAyah;
        window.open(tweetLink);
    }

    return (
        <div id="content" className={"container"}>
            <ArabicAya text={arText} />
            <EnglishAya text={enText} />
            <DefinitionAya text={surahAndAyah} />
            <InputItem onclickFunc={shuffleOnClick} id={'shuffle'} text={'New Ayat'} />
            {/* <InputItem onclickFunc={tweetOnClick} id={'tweet'} text={'tweet'} /> */}
        </div>
    )
}

export default Content;