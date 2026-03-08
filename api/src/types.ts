// ─── Shared primitives ────────────────────────────────────────────────────────

export interface PageResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalPages: number
  totalSize: number
}

export interface KeysetPageResponse<T> {
  content: T[]
  lastKey: string
  hasMorePages: boolean
}

export interface ProblemDetails {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

// ─── Accounts ─────────────────────────────────────────────────────────────────

export interface AccountIdentifier {
  iban?: string
  accountNumber?: string
  sortCode?: string
  bic?: string
  currency?: string
}

export interface PaymentAccount {
  id: string
  merchantID: string
  merchantName?: string
  balance: number
  balanceMinorUnits: number
  submittedPayoutsBalance: number
  submittedPayoutsBalanceMinorUnits: number
  inserted: string
  lastUpdated: string
  currency: string
  accountName: string
  identifier?: AccountIdentifier
  displayName?: string
  summary?: string
  isDefault: boolean
  availableBalance: number
  availableBalanceMinorUnits: number
  accountSupplierName?: string
  isConnectedAccount: boolean
  consentID?: string
  bankName?: string
  expiryDate?: string
  isTrustAccount: boolean
  isArchived: boolean
  isVirtual: boolean
  physicalAccountID?: string
}

export interface PaymentAccountCreate {
  merchantID: string
  currency: string
  accountName: string
  supplierPhysicalAccountID?: string
  accountType?: string
  physicalAccountID?: string
  isTrustAccount?: boolean
  roleIDs?: string[]
}

export interface AccountUpdate {
  accountID?: string
  accountName?: string
}

export interface VirtualAccountCreate {
  name: string
}

export interface VirtualAccountUpdate {
  name: string
}

export interface GenerateStatementRequest {
  accountID?: string
  fromDate?: string
  toDate?: string
  format?: string
}

export type PaymentAccountPageResponse = PageResponse<PaymentAccount>
export type PaymentAccountMinimalPageResponse = PageResponse<PaymentAccount>

// ─── Transactions ─────────────────────────────────────────────────────────────

export interface Counterparty {
  name?: string
  iban?: string
  accountNumber?: string
  sortCode?: string
  bic?: string
  identifier?: AccountIdentifier
}

export interface CounterpartyCreate {
  name?: string
  iban?: string
  accountNumber?: string
  sortCode?: string
  bic?: string
}

export interface Transaction {
  id: string
  accountID: string
  accountName?: string
  merchantID: string
  type: string
  amount: number
  amountMinorUnits: number
  currency: string
  description?: string
  transactionDate: string
  inserted: string
  yourReference?: string
  theirReference?: string
  counterparty?: Counterparty
  counterpartySummary?: string
  balance: number
  balanceMinorUnits: number
  ruleID?: string
  payoutID?: string
  tags?: Tag[]
  accountSequenceNumber?: number
  paymentRequestID?: string
  fxCurrency?: string
  fxAmount?: number
  fxRate?: number
}

export type TransactionPageResponse = PageResponse<Transaction>

// ─── Beneficiaries ────────────────────────────────────────────────────────────

export interface Beneficiary {
  id: string
  merchantID: string
  name: string
  currency: string
  destination?: Counterparty
  approvalCallbackUrl?: string
  isEnabled: boolean
  canAuthorise: boolean
  canUpdate: boolean
  hasCurrentUserAuthorised: boolean
  authorisersRequiredCount: number
  authorisersCompletedCount: number
  createdByEmailAddress?: string
  inserted: string
  lastUpdated?: string
  theirReference?: string
}

export interface BeneficiaryCreate {
  id?: string
  merchantID: string
  sourceAccountIDs?: string[]
  name: string
  currency: string
  destination?: CounterpartyCreate
  theirReference?: string
}

export interface BeneficiaryUpdate {
  sourceAccountIDs?: string[]
  name?: string
  currency?: string
  destination?: Counterparty
  theirReference?: string
}

export type BeneficiaryPageResponse = PageResponse<Beneficiary>

export interface BeneficiariesCreateResponse {
  beneficiaries: Beneficiary[]
  failedBeneficiaries: unknown
}

// ─── Mandates ─────────────────────────────────────────────────────────────────

export interface Mandate {
  id: string
  merchantID: string
  supplierName?: string
  customerFirstName?: string
  customerLastName?: string
  customerEmailAddress?: string
  customerIban?: string
  customerAccountNumber?: string
  customerSortCode?: string
  reference?: string
  isRecurring: boolean
  currency: string
  status: string
  inserted: string
  lastUpdated?: string
}

export interface MandateCreate {
  merchantID: string
  firstName?: string
  lastName?: string
  addressLine1?: string
  addressLine2?: string
  postalCode?: string
  city?: string
  countryCode?: string
  iban?: string
  accountNumber?: string
  sortCode?: string
  emailAddress?: string
  reference?: string
  isRecurring?: boolean
  currency: string
}

export type MandatePageResponse = PageResponse<Mandate>

// ─── Merchants ────────────────────────────────────────────────────────────────

export interface Tag {
  id: string
  merchantID?: string
  name: string
  colourHex?: string
  description?: string
}

export interface Merchant {
  id: string
  name: string
  companyID?: string
  merchantCategoryCode?: string
  shortName?: string
  tradingName?: string
  paymentAccountLimit?: number
  inserted: string
  jurisdiction?: string
  hostedPayVersion?: number
  webHookLimit?: number
  yourRoleName?: string
  logoUrlPng?: string
  logoUrlSvg?: string
  notes?: string
  isBlocked: boolean
  isExited: boolean
  isSuspended: boolean
  suspensionReason?: string
  timeZoneId?: string
  tags?: Tag[]
  paymentAccounts?: PaymentAccount[]
  accountCurrencies?: string[]
}

export interface MerchantUpdate {
  shortName?: string
  paymentAccountLimit?: number
  logoUrlPng?: string
  logoUrlSvg?: string
  notes?: string
}

export type MerchantPageResponse = PageResponse<Merchant>

// ─── Tokens ───────────────────────────────────────────────────────────────────

export interface MerchantToken {
  id: string
  merchantID: string
  description?: string
  permissionTypes?: string[]
  inserted: string
  lastUpdated?: string
  token?: string
  isEnabled: boolean
  expiresAt?: string
  ipAddressWhitelist?: string
  isArchived: boolean
}

export interface TokenAdd {
  merchantID: string
  description?: string
  hmacAlgorithm?: string
  permissionTypes?: string[]
  ipAddressWhitelist?: string
}

export interface TokenUpdate {
  merchantID?: string
  description?: string
  permissionTypes?: string[]
  ipAddressWhitelist?: string
}

export type MerchantTokenPageResponse = PageResponse<MerchantToken>

// ─── Payment Requests ─────────────────────────────────────────────────────────

export interface PaymentRequestResult {
  paymentRequestID: string
  amount: number
  currency: string
  result: string
  requestedAmount: number
  amountReceived: number
  amountRefunded: number
  amountPending: number
  customerID?: string
}

export interface PaymentRequest {
  id: string
  merchantID: string
  amount: number
  currency: string
  customerID?: string
  orderID?: string
  paymentMethods?: string[]
  description?: string
  pispAccountID?: string
  callbackUrl?: string
  failureCallbackUrl?: string
  successWebHookUrl?: string
  cardAuthorizeOnly: boolean
  cardCreateToken: boolean
  status: string
  hostedPayCheckoutUrl?: string
  partialPaymentMethod?: string
  inserted: string
  lastUpdated: string
  useHostedPaymentPage: boolean
  customerEmailAddress?: string
  tags?: Tag[]
  result?: PaymentRequestResult
  amountReceived: number
  amountRefunded: number
  amountPending: number
  dueDate?: string
  customerName?: string
}

export interface PaymentRequestCreate {
  merchantID: string
  amount: number
  currency: string
  customerID?: string
  orderID?: string
  paymentMethods?: string[]
  description?: string
  pispAccountID?: string
  callbackUrl?: string
  failureCallbackUrl?: string
  successWebHookUrl?: string
  cardAuthorizeOnly?: boolean
  cardCreateToken?: boolean
  cardCreateTokenMode?: string
  useHostedPaymentPage?: boolean
  partialPaymentMethod?: string
  customerEmailAddress?: string
  notificationEmailAddresses?: string
  title?: string
  tagIds?: string[]
  autoSendReceipt?: boolean
  dueDate?: string
  notificationRoleIDs?: string[]
}

export interface PaymentRequestUpdate {
  amount?: number
  currency?: string
  customerID?: string
  orderID?: string
  paymentMethods?: string[]
  description?: string
  pispAccountID?: string
  callbackUrl?: string
  failureCallbackUrl?: string
  cardAuthorizeOnly?: boolean
  cardCreateToken?: boolean
  customerEmailAddress?: string
  notificationEmailAddresses?: string
  title?: string
  tagIds?: string[]
  autoSendReceipt?: boolean
  dueDate?: string
  successWebHookUrl?: string
}

export interface PaymentRequestMetrics {
  all: number
  unpaid: number
  partiallyPaid: number
  paid: number
  authorized: number
  totalAmountsByCurrency?: Record<string, number>
}

export type PaymentRequestPageResponse = PageResponse<PaymentRequest>

export interface PaymentRequestMinimal {
  id: string
  amount: number
  currency: string
  status: string
}

// ─── Payouts ──────────────────────────────────────────────────────────────────

export interface Payout {
  id: string
  payrunID?: string
  accountID: string
  merchantID: string
  userID?: string
  type: string
  description?: string
  currency: string
  amount: number
  amountMinorUnits: number
  formattedAmount?: string
  yourReference?: string
  theirReference?: string
  status: string
  inserted: string
  lastUpdated?: string
  destination?: Counterparty
  tags?: Tag[]
  scheduled: boolean
  scheduleDate?: string
  canAuthorise: boolean
  canUpdate: boolean
  hasCurrentUserAuthorised: boolean
  isSubmitted: boolean
  isFailed: boolean
  isSettled: boolean
  fxDestinationCurrency?: string
  fxRate?: number
  fxDestinationAmount?: number
}

export interface PayoutCreate {
  accountID: string
  type: string
  description?: string
  currency: string
  amount: number
  yourReference?: string
  theirReference?: string
  destination?: CounterpartyCreate
  invoiceID?: string
  allowIncomplete?: boolean
  tagIds?: string[]
  scheduled?: boolean
  scheduleDate?: string
  beneficiaryID?: string
  batchPayoutID?: string
  paymentRail?: string
  chargeBearer?: string
  fxDestinationCurrency?: string
  fxDestinationAmount?: number
  fxUseDestinationAmount?: boolean
  fxQuoteID?: string
}

export interface PayoutUpdate {
  accountID?: string
  type?: string
  description?: string
  currency?: string
  amount?: number
  yourReference?: string
  theirReference?: string
  destination?: Counterparty
  allowIncomplete?: boolean
  tagIds?: string[]
  scheduled?: boolean
  scheduleDate?: string
  paymentRail?: string
  chargeBearer?: string
  fxDestinationCurrency?: string
  fxDestinationAmount?: number
  fxUseDestinationAmount?: boolean
  fxQuoteID?: string
}

export interface PayoutReject {
  reason?: string
}

export interface PayoutMetrics {
  all: number
  inProgress: number
  pendingApproval: number
  failed: number
  paid: number
  scheduled: number
  totalAmountsByCurrency?: Record<string, number>
}

export interface FxRate {
  sourceCurrency: string
  destinationCurrency: string
  exchangeRate: number
  quoteID?: string
  expiryTime?: string
}

export interface BatchPayout {
  id: string
  approveUrl?: string
  payouts?: Payout[]
}

export type PayoutPageResponse = PageResponse<Payout>
export type PayoutKeysetPageResponse = KeysetPageResponse<Payout>

// ─── Payruns ──────────────────────────────────────────────────────────────────

export interface Payrun {
  id: string
  batchPayoutID?: string
  name: string
  merchantID: string
  inserted: string
  lastUpdated?: string
  scheduleDate?: string
  status: string
  isArchived: boolean
  totalEur?: number
  totalGbp?: number
  totalUsd?: number
  payoutsCount: number
  authorisationsCompletedCount: number
  authorisersRequiredCount: number
  canAuthorise: boolean
  hasCurrentUserAuthorised: boolean
  canEdit: boolean
  canDelete: boolean
}

export interface PayrunCreate {
  name: string
  invoices?: unknown[]
}

export interface PayrunUpdate {
  id?: string
  name?: string
  scheduledDate?: string
}

export interface PayrunApprove {
  nonce?: string
}

export interface PayrunAuthorisation {
  nonce?: string
}

export interface PayrunReject {
  reason?: string
}

export type PayrunPageResponse = PageResponse<Payrun>

// ─── Rules ────────────────────────────────────────────────────────────────────

export interface SweepAction {
  destinationAccountID?: string
  amount?: number
  percentage?: number
}

export interface Rule {
  id: string
  accountID: string
  merchantID: string
  name: string
  description?: string
  isDisabled: boolean
  status: string
  triggerOnPayIn: boolean
  triggerCronExpression?: string
  timeZoneId?: string
  startAt?: string
  endAt?: string
  sweepAction?: SweepAction
  onApprovedWebHookUrl?: string
  onExecutionErrorWebHookUrl?: string
  onExecutionSuccessWebHookUrl?: string
  inserted: string
  lastUpdated?: string
  lastExecutedAt?: string
  canAuthorise: boolean
  hasCurrentUserAuthorised: boolean
  authorisersRequiredCount: number
  authorisersCompletedCount: number
}

export interface RuleCreate {
  accountID: string
  name: string
  description?: string
  onApprovedWebHookUrl?: string
  onExecutionErrorWebHookUrl?: string
  onExecutionSuccessWebHookUrl?: string
  isDisabled?: boolean
  triggerOnPayIn?: boolean
  triggerCronExpression?: string
  timeZoneId?: string
  startAt?: string
  endAt?: string
  sweepAction?: SweepAction
  webHookSecret?: string
}

export interface RuleUpdate {
  accountID?: string
  name?: string
  description?: string
  onApprovedWebHookUrl?: string
  onExecutionErrorWebHookUrl?: string
  onExecutionSuccessWebHookUrl?: string
  isDisabled?: boolean
  triggerOnPayIn?: boolean
  triggerCronExpression?: string
  timeZoneId?: string
  startAt?: string
  endAt?: string
  sweepAction?: SweepAction
  webHookSecret?: string
}

export type RulesPageResponse = PageResponse<Rule>

// ─── Webhooks ─────────────────────────────────────────────────────────────────

export interface Webhook {
  id: string
  resourceTypes?: string[]
  destinationUrl: string
  retry: boolean
  secret?: string
  isActive: boolean
  emailAddress?: string
  version?: number
  failedNotificationEmailAddress?: string
  merchantID: string
  notificationMethod?: string
}

export interface WebhookCreate {
  merchantID: string
  resourceTypes?: string[]
  destinationUrl: string
  retry?: boolean
  secret?: string
  isActive?: boolean
  emailAddress?: string
  failedNotificationEmailAddress?: string
  notificationMethod?: string
}

export interface WebhookUpdate {
  merchantID?: string
  resourceTypes?: string[]
  destinationUrl?: string
  retry?: boolean
  secret?: string
  isActive?: boolean
  emailAddress?: string
  failedNotificationEmailAddress?: string
  notificationMethod?: string
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  firstName: string
  lastName: string
  emailAddress: string
  twoFactorEnabled: boolean
  passkeyAdded: boolean
}

export interface UserUpdate {
  firstName?: string
  lastName?: string
  emailAddress?: string
  userInviteID?: string
  profile?: string
}

export type UserPageResponse = PageResponse<User>

// ─── User Invites ─────────────────────────────────────────────────────────────

export interface UserInvite {
  id: string
  inviteeEmailAddress: string
  inviterFirstName?: string
  inviterLastName?: string
  inviteeFirstName?: string
  inviteeLastName?: string
  inviterEmailAddress?: string
  merchantID: string
  registrationUrl?: string
  lastInvited?: string
  merchantName?: string
  message?: string
  userID?: string
  isInviteeRegistered: boolean
  initialRoleID?: string
  isAuthorised: boolean
  status: string
}

export interface UserInviteCreate {
  merchantID: string
  inviteeEmailAddress: string
  inviteeFirstName?: string
  inviteeLastName?: string
  sendInviteEmail?: boolean
  initialRoleID?: string
}

export type UserInvitePageResponse = PageResponse<UserInvite>

// ─── Metadata ─────────────────────────────────────────────────────────────────

export interface NoFrixionVersion {
  majorVersion: number
  minorVersion: number
  buildVersion: number
  releaseName?: string
}

// ─── Open Banking ─────────────────────────────────────────────────────────────

export interface ConsentRequest {
  emailAddress: string
  institutionID: string
  merchantID: string
  callbackUrl?: string
  successWebHookUrl?: string
  failureCallbackUrl?: string
  isConnectedAccounts?: boolean
}

export interface ConsentResponse {
  consentID: string
  authorisationUrl: string
}

export interface Consent {
  id: string
  merchantID: string
  institutionID: string
  emailAddress: string
  isEnabled: boolean
  callbackUrl?: string
  successWebHookUrl?: string
  failureCallbackUrl?: string
  provider?: string
  expiryDate?: string
  inserted: string
}

export interface PayeeVerificationResult {
  result: string
  payeeVerifiedAccountName?: string
}

export interface VerifyPayeeRequest {
  [key: string]: unknown
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export interface ReportResult {
  [key: string]: unknown
}

// ─── Batch response helpers ───────────────────────────────────────────────────

export interface PaymentRequestsCreateResponse {
  paymentRequests: PaymentRequest[]
  failedPaymentRequests: unknown
}

export interface BeneficiaryGroupPageResponse extends PageResponse<unknown> {}

export interface CardCustomerToken {
  id: string
  [key: string]: unknown
}

export interface CardPaymentResponse {
  authorizedAmount?: string
  currencyCode?: string
  responseCode?: string
  status: string
  requestID?: string
  transactionID?: string
  paymentRequestID: string
  responseType?: string
}

export interface CardPublicKey {
  jwt: string
}

export interface PaymentInitiationResponse {
  [key: string]: unknown
}

export interface MerchantAuthorisationSetting {
  [key: string]: unknown
}

export interface MerchantPayByBankSettings {
  [key: string]: unknown
}
