import React, { Component, useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            console.log("will mount 1");
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
            console.log("will mount 2");
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [])

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    click={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;