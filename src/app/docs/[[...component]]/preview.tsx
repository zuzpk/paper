"use client"
import { AppStore } from '@/store';
import { useStore } from '@zuzjs/store';
import { Box, camelCase, dynamicObject, SPINNER, Spinner, TabView, Text, ucfirst } from '@zuzjs/ui';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Controls from './controls';
import CodeHighlighter from './highlighter';
import PreviewPortal from './portal';

const Preview : React.FC = (_props) => {

    const { loading, modules } = useStore<typeof AppStore.Docs>(`docs`)
    const pathname = usePathname()
    const [title, setTitle] = useState<string>(`Preview`)
    const [code, setCode] = useState<string >(`()=>{}`)
    const [localProps, setLocalProps] = useState<dynamicObject>({})
    
    const Module : {
        default: any,
        props: any
    } = useMemo(() => {
        
        const cm = pathname.replace(`/docs/`, ``).split(`/`)

        const module = modules[cm.length > 2 ? cm.slice(0, -1).join(`_`) : cm.join(`_`)]
        
        if ( module !== undefined ){

            const _cm = cm[cm.length-1]
            const _props = cm.length > 2 ? module[_cm.includes(`-`) ? camelCase(_cm.split(`-`).join(` `), true) : ucfirst(_cm)] 
            :   module.Default || 
                module.default.props || 
                { 
                    children: <Text>Either add a Default : PaperVariant or `props` in your main Paper</Text>
                }

            setTitle(ucfirst(cm[1]))
            setLocalProps(_props)

            return {
                default: module.default,
                props: _props
            }
        }

        return {
            default: null,
            props: {}
        }
        // return modules[m].default.component
        // if ( !modules[m] ) return <
        // return cm.length > 2 ? modules[m][ucfirst(cm[cm.length-1])] : modules[m].default
    }, [loading, modules, pathname])

    // const code = useMemo(() => {
    //     return `<${title}>${Module.props.children}</${title}>`
    // }, [Module, title])

    useEffect(() => {
        if ( Module && Module.default ){
            // const htmlString = ReactDOMServer.renderToString(<Module.default.component {...localProps} />);
            // setCode(htmlString)
            const _code = [`<${title} `]
            Object.keys(localProps)
                .filter(x => x != `children`)
                .forEach((k, i) => {
                    _code.push(`${i > 0 ? ` ` : ``}\n\t${k}={${JSON.stringify(localProps[k])}}`)
                })
            _code.push( Module.props.children ? `>` : ` />`)
        if ( Module.props.children )
                _code.push(`\n\t`, Module.props.children, `\n`, `</${title}>`)
            setCode(_code.join(``))
        }
        else setCode(`()=>{}`)
    }, [Module, localProps])

    // console.log(Module, localProps)

    return <Box as={`flex:1 rel flex aic jcc bg:fff minH:100vh`}>

        <Text as={`abs top:20 left:20`}>Preview</Text>

        { loading &&  <Spinner type={SPINNER.Wave} /> }
        { !loading && Module.default && <Box as={`flex cols w:100% h:100% no-overflow`}>
            <PreviewPortal>
                <Module.default.component {...localProps} /> 
            </PreviewPortal>
            <TabView 
                variant={`fixed`}
                as={`w:calc[100vw - 300px]`}
                tabs={[
                    {
                        icon: `setting-4`,
                        label: `Controls`,
                        body: <Controls
                            onArgChange={(key, val) => {
                                setLocalProps(prev => ({
                                    ...prev,
                                    [key] : val
                                }))
                            }}
                            argTypes={Module.default.propsType}
                            args={localProps} />,
                        onSelect: () => {}
                    },
                    {
                        icon: `code`,
                        label: `Code`,
                        body: <CodeHighlighter code={code} language="jsx" />,
                        onSelect: () => {}
                    },
                ]}
            />
            
        </Box>}

    </Box>
}

export default Preview;