import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { useState, useEffect } from "react";

export const TranslateText = (codeLanguage, text) => {
    const [ useText, setText ] = useState("")
    useEffect(()=>{
        const fcTransLateText = async (language, textVariable) => {
            if (language === 'en') {
                setText( textVariable )
            } else {
              const resText = await GetTranslateHolder(
                textVariable,
                language
              );
              setText( resText )
            }
        };
        if( text?.length ) {
            fcTransLateText( codeLanguage, text )
        } else {
            setText(text)
        }
        
    },[codeLanguage, text])

    return useText
}