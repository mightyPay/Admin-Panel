export enum TransactionStatus {
  PENDING = "Pending",
  SUCCESS = "Success",
  FAILED = "Failed",
  APPROVED = "Approved",
  DECLINED = "Declined",
  INACTIVE = "Inactive",
}

export enum TransactionType {
  WALLET_TOP_UP = "Wallet top up",
  TRANSFER = "Transfer",
  WALLET_WITHDRAWEL = "Wallet withdrawal",
  WALLET_TRANSFER = "Wallet transfer",
}

export enum PaymentSource {
  WALLET = "Wallet",
  LEAN = "Lean",
  LEAN_WITH_PAYMENT_PAGE = "Lean with payment page",
}


