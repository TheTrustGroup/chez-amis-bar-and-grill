"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AllergenInfoProps {
  isOpen: boolean
  onClose: () => void
}

const commonAllergens = [
  { name: "Gluten", icon: "🌾", description: "Found in wheat, barley, rye, and oats" },
  { name: "Dairy", icon: "🥛", description: "Milk, cheese, butter, and cream products" },
  { name: "Eggs", icon: "🥚", description: "Eggs and egg-based products" },
  { name: "Fish", icon: "🐟", description: "Fish and fish products" },
  { name: "Shellfish", icon: "🦐", description: "Crustaceans and mollusks" },
  { name: "Tree Nuts", icon: "🥜", description: "Almonds, walnuts, cashews, etc." },
  { name: "Peanuts", icon: "🥜", description: "Peanuts and peanut products" },
  { name: "Soy", icon: "🫘", description: "Soybeans and soy products" },
  { name: "Sesame", icon: "🌰", description: "Sesame seeds and sesame oil" },
]

export function AllergenInfo({ isOpen, onClose }: AllergenInfoProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-serif text-gray-900">Allergen Information</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 mb-6 font-light">
              We take food allergies and dietary restrictions seriously. Please inform your server
              of any allergies or dietary requirements before ordering.
            </p>

            {/* Common Allergens */}
            <div className="mb-6">
              <h3 className="text-lg font-serif text-gray-900 mb-4">Common Allergens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonAllergens.map((allergen) => (
                  <div
                    key={allergen.name}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors"
                  >
                    <span className="text-2xl">{allergen.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{allergen.name}</h4>
                      <p className="text-sm text-gray-600 font-light">{allergen.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900 font-light">
                <strong className="font-medium">Important:</strong> While we make every effort to
                accommodate dietary restrictions, our kitchen handles all allergens. Cross-contamination
                may occur. Please speak with our staff for detailed allergen information about specific
                menu items.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-light">
                For detailed allergen information or to discuss your dietary needs, please ask to
                speak with our manager or chef.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <Button
              onClick={onClose}
              className="w-full bg-amber-500 text-white hover:bg-amber-600"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

