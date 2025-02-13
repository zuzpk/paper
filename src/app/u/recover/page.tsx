"use client"
import { API_URL, APP_NAME } from '@/config';
import Style from '@/ui';
import { Box, Button, css, dynamicObject, Form, FORMVALIDATION, Input, Size, Text, TRANSITION_CURVES, TRANSITIONS, useMounted } from '@zuzjs/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

const Recover : React.FC = (props) => {

    const mounted = useMounted()
    const anim = useMemo(() => ({
        transition: TRANSITIONS.SlideInTop,
        curve: TRANSITION_CURVES.Spring,
        when: mounted,
        duration: 0.5
    }), [mounted])

    const router = useRouter();

    const onSuccess = (resp: dynamicObject) => {
        router.push(`/u/recover/verify/${resp.token}/${encodeURIComponent(resp.email)}`)
    }

    useEffect(() => {}, [])

    return <Box as={`minH:calc[100vh - 70px] flex aic jcc`}>
        <Form 
            name={`recover`}
            action={`/@/u/recover`}
            onSuccess={onSuccess}
            errors={{
                em: `Valid email is required`,
            }}
            as={`flex aic jcc cols w:400 gap:12`}>
            
            <Text animate={{ ...anim, delay: 0.1 }} as={`s:30 b:900 mb:30`}>Recover {APP_NAME} Account</Text>

            <Input variant={Size.Medium} name={`em`} placeholder={`Email`} animate={{ ...anim, delay: 0.1 }} required with={FORMVALIDATION.Email} />
            
            <Button size={Size.Medium} type={`submit`} as={`mt:25 w:100%!`} animate={{ ...anim, delay: 0.35 }}>Continue</Button>

            <Text as={`mt:35`} animate={{ ...anim, delay: 0.45 }}>Already have an account? <Link className={css(`${Style.Link} bold`)} href={`/u/signin`}>Sign in here</Link></Text>
            <Text animate={{ ...anim, delay: 0.45 }}>New here? <Link className={css(`${Style.Link} bold`)} href={`/u/signup`}>Create account</Link></Text>

        </Form>
    </Box>
}

export default Recover