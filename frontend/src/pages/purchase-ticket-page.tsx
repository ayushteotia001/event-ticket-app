import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { purchaseTicket } from "@/lib/api";
import { CheckCircle, CreditCard, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router";

const PurchaseTicketPage: React.FC = () => {
  const { eventId, ticketTypeId } = useParams();

  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>();
  const [isPurchaseSuccess, setIsPurchaseASuccess] = useState(false);

  // Payment form fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  // Get roles from Keycloak
  const roles =
    (user?.profile?.realm_access as { roles?: string[] } | undefined)
      ?.roles ?? [];

  const isOrganizer = roles.includes("ROLE_ORGANIZER");
  const isStaff = roles.includes("ROLE_STAFF");

  useEffect(() => {
    if (!isPurchaseSuccess) {
      return;
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPurchaseSuccess, navigate]);

  const handlePurchase = async () => {
    // Clear previous error
    setError(undefined);

    // Organizer restriction
    if (isOrganizer) {
      setError("Organizers cannot purchase tickets.");
      return;
    }

    // Staff restriction
    if (isStaff) {
      setError("Staff members cannot purchase tickets.");
      return;
    }

    // Check authentication and required parameters
    if (
      isLoading ||
      !user?.access_token ||
      !eventId ||
      !ticketTypeId
    ) {
      setError("Unable to process your request. Please try again.");
      return;
    }

    // Validate credit card number
    if (!cardNumber.trim()) {
      setError("Credit card number is required.");
      return;
    }

    // Remove spaces from card number
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");

    // Validate 16-digit card number
    if (!/^\d{16}$/.test(cleanedCardNumber)) {
      setError("Please enter a valid 16-digit credit card number.");
      return;
    }

    // Validate cardholder name
    if (!cardholderName.trim()) {
      setError("Cardholder name is required.");
      return;
    }

    // Allow only letters and spaces
    if (!/^[a-zA-Z\s]+$/.test(cardholderName.trim())) {
      setError("Cardholder name should contain only letters.");
      return;
    }

    try {
      await purchaseTicket(
        user.access_token,
        eventId,
        ticketTypeId
      );

      // Purchase successful
      setIsPurchaseASuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        const message = err.message.toLowerCase();

        // Backend authorization error
        if (
          message.includes("403") ||
          message.includes("forbidden") ||
          message.includes("not allowed")
        ) {
          if (isOrganizer) {
            setError("Organizers cannot purchase tickets.");
          } else if (isStaff) {
            setError("Staff members cannot purchase tickets.");
          } else {
            setError("You are not allowed to purchase tickets.");
          }

          return;
        }

        setError(err.message);
        return;
      }

      if (typeof err === "string") {
        setError(err);
        return;
      }

      setError("An unknown error occurred.");
    }
  };

  // Successful purchase screen
  if (isPurchaseSuccess) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center">
        <div className="max-w-md mx-auto p-8 text-center">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-black">
            <div className="space-y-4">

              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

              <h2 className="text-2xl font-bold text-green-600">
                Thank you!
              </h2>

              <p className="text-gray-600">
                Your ticket purchase was successful.
              </p>

              <p className="text-gray-600 text-sm">
                Redirecting to home page in a few seconds...
              </p>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-md mx-auto py-20 px-4">

        <div className="bg-white border-gray-300 shadow-sm border rounded-lg space-y-4 p-6">

          {/* Organizer restriction */}
          {isOrganizer && (
            <div className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-start gap-3">

                <ShieldAlert className="h-5 w-5 text-yellow-600 mt-0.5" />

                <div>
                  <p className="font-semibold text-yellow-800">
                    Purchase not available
                  </p>

                  <p className="text-yellow-700 text-sm mt-1">
                    Organizers cannot purchase tickets.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Staff restriction */}
          {isStaff && (
            <div className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-start gap-3">

                <ShieldAlert className="h-5 w-5 text-yellow-600 mt-0.5" />

                <div>
                  <p className="font-semibold text-yellow-800">
                    Purchase not available
                  </p>

                  <p className="text-yellow-700 text-sm mt-1">
                    Staff members cannot purchase tickets.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* General error message */}
          {error && (
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="text-red-500 text-sm">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          {/* Credit Card Number */}
          <div className="space-y-2">

            <Label className="text-gray-600">
              Credit Card Number
            </Label>

            <div className="relative">

              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers and spaces
                  if (/^[0-9\s]*$/.test(value)) {
                    setCardNumber(value);
                    setError(undefined);
                  }
                }}
                disabled={isOrganizer || isStaff}
                className="bg-gray-200 text-black pl-10"
              />

              <CreditCard className="absolute h-4 w-4 text-gray-400 top-2.5 left-3" />

            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">

            <Label className="text-gray-600">
              Cardholder Name
            </Label>

            <div className="relative">

              <Input
                type="text"
                placeholder="John Smith"
                value={cardholderName}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only letters and spaces
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setCardholderName(value);
                    setError(undefined);
                  }
                }}
                disabled={isOrganizer || isStaff}
                className="bg-gray-200 text-black pl-10"
              />

              <CreditCard className="absolute h-4 w-4 text-gray-400 top-2.5 left-3" />

            </div>
          </div>

          {/* Purchase Button */}
          <div className="flex justify-center">

            <Button
              className="bg-purple-500 hover:bg-purple-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePurchase}
              disabled={isOrganizer || isStaff || isLoading}
            >
              {isOrganizer || isStaff
                ? "Purchase Not Available"
                : "Purchase Ticket"}
            </Button>

          </div>

          {/* Mock payment information */}
          <div className="text-gray-500 text-xs text-center">
            This is a mock page, no real payment details are processed.
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketPage;