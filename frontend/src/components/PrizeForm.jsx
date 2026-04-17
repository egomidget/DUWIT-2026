import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

export default function PrizeForm({ winner, showModal, setShowModal }) {
    const [formData, setFormData] = useState({
        email: '',
        prize: ''
    });

    useEffect(() => {
        if (winner) {
            setFormData(prev => ({ ...prev, prize: winner }));
        }
    }, [winner]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBtnClick = async (e) => {
        if (e) e.preventDefault();
        
        console.log('Sending data:', formData);

        try {
            const response = await fetch('/api/log-winner/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Winner logged successfully');
            } else {
                console.error('Failed to log winner');
            }
        } catch (err) {
            console.error('Error logging winner:', err);
        }

        setShowModal(false);
        setFormData(prev => ({ ...prev, email: '' }));
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered className="candy-modal">
            <Modal.Header closeButton className="candy-stripe">
                <Modal.Title className="sugar-font text-white">Sweet Victory!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h2 className="sugar-font text-pink mb-3">You Won:</h2>
                <div className="winner-display sugar-font mb-4">{winner}</div>

                <Form onSubmit={handleBtnClick}>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="email"
                            name="email"
                            className="input-glaze"
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder="Email to claim your prize!" 
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="btn-sugar w-100 mt-2">
                        CLAIM PRIZE!
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
