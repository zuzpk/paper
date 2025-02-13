"use client"
import { API_URL, APP_NAME, REDIRECT_AFTER_OAUTH, SESS_PREFIX } from '@/config';
import Style from '@/ui';
import { useStore } from '@zuzjs/store';
import { Box, Button, css, dynamicObject, Form, FORMVALIDATION, Input, Password, Size, Text, TRANSITION_CURVES, TRANSITIONS, useMounted } from '@zuzjs/ui';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

const Signin : React.FC = (props) => {

    const mounted = useMounted()
    const anim = useMemo(() => ({
        transition: TRANSITIONS.SlideInTop,
        curve: TRANSITION_CURVES.Spring,
        when: mounted,
        duration: 0.5
    }), [mounted])
    const { dispatch } = useStore(`user`)
    const router = useRouter();

    const onSuccess = (resp: dynamicObject) => {
        for( const key in resp.u ){
            Cookies.set(`${SESS_PREFIX}${key}`, `${`string` == typeof resp.u[key] ? resp.u[key] : JSON.stringify(resp.u[key])}`, { expires: 90 })
        }
        dispatch({ ...resp.u.ud }).then(() => router.push(`${REDIRECT_AFTER_OAUTH}?_=${Date.now()}`))
    }

    useEffect(() => {}, [])

    return <Box as={`minH:calc[100vh - 70px] flex aic jcc`}>
        <Form 
            name={`signin`}
            action={`/@/u/signin`}
            onSuccess={onSuccess}
            errors={{
                em: `Valid email is required`,
                psw: `Password is required`,
            }}
            as={`flex aic jcc cols w:400 gap:12`}>
            
            <Text animate={{ ...anim, delay: 0.1 }} as={`s:30 b:900 mb:30`}>Signin to {APP_NAME}</Text>

            <Input variant={Size.Medium} name={`em`} placeholder={`Email`} animate={{ ...anim, delay: 0.1 }} required with={FORMVALIDATION.Email} />
            <Password variant={Size.Medium} name={`psw`} placeholder={`Password`} animate={{ ...anim, delay: 0.2 }} required />
            
            <Button size={Size.Medium} type={`submit`} as={`w:100%! mt:25`} animate={{ ...anim, delay: 0.35 }}>Sign in</Button>

            <Text as={`mt:35`} animate={{ ...anim, delay: 0.4 }}><Link className={css(`${Style.Link} bold`)} href={`/u/recover`}>Forgot Password?</Link></Text>
            <Text animate={{ ...anim, delay: 0.45 }}>New here? <Link className={css(`${Style.Link} bold`)} href={`/u/signup`}>Create account</Link></Text>

        </Form>
    </Box>
}

export default Signin;