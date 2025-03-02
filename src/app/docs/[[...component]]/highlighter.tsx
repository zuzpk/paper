"use client"
import { common, createStarryNight } from "@wooorm/starry-night";
import { Box, Button, copyToClipboard, Sheet, SheetHandler, ToolTip } from '@zuzjs/ui';
import { toHtml } from "hast-util-to-html";
import prettier from "prettier";
import babelParser from "prettier/plugins/babel";
import estreeParser from "prettier/plugins/estree";
import React, { useEffect, useRef, useState } from 'react';

const CodeHighlighter : React.FC<{ code: string, language : string }> = ({ code, language }) => {

    const [prettyCode, setPrettyCode] = useState("");
    const [highlightedCode, setHighlightedCode] = useState("");
    const toast = useRef<SheetHandler>(null)

    useEffect(() => {
        const highlight = async () => {
          const starryNight = await createStarryNight(common);
          const _code = await prettier.format(code, {
            parser: "babel",
            plugins: [estreeParser, babelParser],
            // semi: false,
            singleQuote: true,
            trailingComma: "es5",
            jsxSingleQuote: true,
          })
          setPrettyCode(_code)
          const scope = starryNight.flagToScope(language) || "text.plain";
          const tree = starryNight.highlight(_code, scope);
          setHighlightedCode(toHtml(tree));
        };
    
        highlight();
      }, [code, language]);

    return <Box as={`rel h:100% flex:1`}>
        <Box as={`abs top:5 right:5 bg:rgba[255,255,255,0.1] r:10 flex aic`}>
        <ToolTip title={`Copy`}>
            <Button icon={`document-copy`} onClick={_e => copyToClipboard(prettyCode).then(() => toast.current?.success(`Code copied to clipboard`))} as={`p:5 r:10 bg:transparent!`} />
        </ToolTip>
        </Box>
        <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
        <Sheet ref={toast} />
    </Box>
}

export default CodeHighlighter;