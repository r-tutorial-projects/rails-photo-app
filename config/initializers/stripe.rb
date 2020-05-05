Rails.configuration.stripe = {
    :pk => Rails.application.credentials.STRIPE_PK,
    :sk => Rails.application.credentials.STRIPE_SK
}

Stripe.api_key = Rails.configuration.stripe[:sk]
