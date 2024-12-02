{
    "message": "Capture successful payment",
        "status": 200,
            "metadata": {
        "jsonResponse": {
            "id": "6AS530375J855005F",
                "status": "COMPLETED",
                    "payment_source": {
                "paypal": {
                    "email_address": "sb-rypkv33926525@personal.example.com",
                        "account_id": "BAYUZ6RZT452G",
                            "account_status": "VERIFIED",
                                "name": {
                        "given_name": "John",
                            "surname": "Doe"
                    },
                    "address": {
                        "country_code": "US"
                    }
                }
            },
            "purchase_units": [
                {
                    "reference_id": "default",
                    "shipping": {
                        "name": {
                            "full_name": "tuan ho"
                        },
                        "address": {
                            "address_line_1": "1st",
                            "address_line_2": "hoang ton",
                            "admin_area_2": "San Jose",
                            "admin_area_1": "Alabama",
                            "postal_code": "22222222",
                            "country_code": "US"
                        }
                    },
                    "payments": {
                        "captures": [
                            {
                                "id": "7NP67622WY8734149",
                                "status": "COMPLETED",
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "49.96"
                                },
                                "final_capture": true,
                                "seller_protection": {
                                    "status": "ELIGIBLE",
                                    "dispute_categories": [
                                        "ITEM_NOT_RECEIVED",
                                        "UNAUTHORIZED_TRANSACTION"
                                    ]
                                },
                                "seller_receivable_breakdown": {
                                    "gross_amount": {
                                        "currency_code": "USD",
                                        "value": "49.96"
                                    },
                                    "paypal_fee": {
                                        "currency_code": "USD",
                                        "value": "2.23"
                                    },
                                    "net_amount": {
                                        "currency_code": "USD",
                                        "value": "47.73"
                                    }
                                },
                                "links": [
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/payments/captures/7NP67622WY8734149",
                                        "rel": "self",
                                        "method": "GET"
                                    },
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/payments/captures/7NP67622WY8734149/refund",
                                        "rel": "refund",
                                        "method": "POST"
                                    },
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/6AS530375J855005F",
                                        "rel": "up",
                                        "method": "GET"
                                    }
                                ],
                                "create_time": "2024-11-29T00:08:37Z",
                                "update_time": "2024-11-29T00:08:37Z"
                            }
                        ]
                    }
                }
            ],
                "payer": {
                "name": {
                    "given_name": "John",
                        "surname": "Doe"
                },
                "email_address": "sb-rypkv33926525@personal.example.com",
                    "payer_id": "BAYUZ6RZT452G",
                        "address": {
                    "country_code": "US"
                }
            },
            "links": [
                {
                    "href": "https://api.sandbox.paypal.com/v2/checkout/orders/6AS530375J855005F",
                    "rel": "self",
                    "method": "GET"
                }
            ]
        }
    }
}