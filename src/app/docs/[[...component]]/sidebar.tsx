"use client"
import { APP_NAME, APP_VERSION } from '@/config';
import { AppStore } from '@/store';
import { useStore } from '@zuzjs/store';
import { Box, camelCaseToDash, ColorScheme, css, dynamicObject, Image, Search, slugify, SPINNER, Spinner, Text, TreeNode, TreeView, ucfirst } from '@zuzjs/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { scanPaperFiles } from '../../actions';
// import * as papers from "./papers"

const Sidebar : React.FC = (_props) => {

    const { loading, list, roots, current, dispatch } = useStore<typeof AppStore.Docs>(`docs`)
    const pathname = usePathname()
    
    const loadPapers = async () => {

        const papers = await scanPaperFiles()
        const _list : TreeNode[] = []
        const _root : string[] = []
        const _modules : dynamicObject = {}

        for(const paper of papers){

            const module = await import (`../../papers/${paper}`)

            const title = module.default.title.split(`/`)
            const comp = title[title.length - 1]
            const under = slugify(title.slice(0, -1)?.join(`-`) || "") 
            const meta = title.reduce((p: string[], c: string) => { p.push(slugify(camelCaseToDash(c))); return p; }, [])

            _modules[meta.join(`_`)] = module

            _root.push(slugify(title[0]))
            _list.push({ 
                tag: slugify(title[0]), 
                label: title[0], 
                expanded: true
            })

            //Childs
            _list.push({
                tag: meta.join(`_`),
                label: comp,
                under
            })

            //Nested
            Object
                .keys(module)
                .filter((k) => k != `default`)
                .forEach((k) => {
                    _list.push({
                        tag: [...meta, slugify(camelCaseToDash(k))].join(`_`),
                        label: ucfirst(k),
                        under: meta.join(`_`)
                    })
                })

            
        }

        dispatch({ loading: false, list: _list, roots: _root, modules: _modules })

    }

    const onRoute = (tag: string) => {
        dispatch({ current: tag })
        window.history.pushState(null, ``, `/docs/${tag.replace(/_/g, `/`)}`)
    }

    const setCurrentTreeNode = (path: string) => {
        const p = path.replace(`/docs/`, ``).split(`/`).join(`_`)
        if ( !p.startsWith(`_`) ){
            dispatch({ current: p })
        }        
    }

    const treeView = useMemo(() => {
        
        return <TreeView 
            roots={roots}
            onNodeSelect={onRoute}
            selected={current || roots[0]}
            icons={{
                rootOpen: `package`,
                rootClose: `package`,
                nodeOpen: `grid-four`,
                nodeClose: `grid-four`,
                // arrowClose: `arrow-right-2`,
                // arrowOpen: `arrow-down`,
            }}
            nodes={list}
        />
    }, [roots, list, current])

    useEffect(() => {
        loadPapers()
    }, [])

    useEffect(() => {
        setCurrentTreeNode(pathname)
    }, [pathname])

    return <Box as={`sidebar flex cols gap:20 flex:1 p:25 maxW:300`}>

        <Box as={`logo flex aic mb:25`}>
            <Link href={`/` as any} className={css(`tdn`)}><Box as={`app-logo rel flex aic jcc gap:4`}>
                <Image src="/imgs/zuz-logo.png" alt={APP_NAME} as={`w:25`} />
                <Text as={`s:18 b:900`}>{APP_NAME}</Text>
                <Text as={`s:14 b:900 bg:$button-link r:5 p:1,4,0,4 border:1,$button-link-border,solid`}>UI</Text>
                <Text as={`s:14 opacity:0.5`}>v{APP_VERSION}</Text>
            </Box></Link>
        </Box> 

        <ColorScheme as={`ml:20`} />

        <Search placeholder={`Search Components`} />

        {loading ? <Spinner type={SPINNER.Wave} as={`m:20`} /> : treeView}

    </Box>

}

export default Sidebar;