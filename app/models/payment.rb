class Payment < ApplicationRecord
  attr_accessor :card_number, :card_cvc, :card_expires_month, :card_expires_year
  belongs_to :user

  def self.month_options
    Date::MONTHNAMES.compact.each_with_index.map { |name, i| ["#{i + 1}", i + 1] }
  end

  def self.year_options
    (Date.today.year..(Date.today.year + 10)).to_a
  end

  def process_payment
    Stripe::PaymentIntent.create({
                                     amount: 1000,
                                     currency: 'usd',
                                     payment_method_types: ['card'],
                                     receipt_email: email,
                                 })
  end
end
