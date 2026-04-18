'use client';

import { useState } from 'react';
import { Save, Building, Clock, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: 'Chez Amis Bar and Grill',
    email: 'chez@chezamisrestaurant.com',
    phone: '+233 XX XXX XXXX',
    address: '123 Main Street, Accra, Ghana',
    website: 'www.chezamisrestaurant.com',
    openingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '09:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '22:00', closed: false },
    },
    taxRate: 15,
    serviceCharge: 5,
    deliveryFee: 10,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const updateHours = (day: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="ui-stack-lg">
      <PageHeader
        title="Restaurant Settings"
        subtitle="Manage restaurant information and operational defaults."
        actions={
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-md border border-terra-500 px-3 py-2 text-sm font-medium text-terra-700 hover:bg-terra-50 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      {/* Restaurant Information */}
      <div className="ui-panel">
        <div className="mb-6 flex items-center gap-3">
          <Building className="w-6 h-6 text-amber-600" />
          <h2 className="text-base font-semibold text-foreground">Restaurant Information</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Restaurant Name</label>
            <input
              type="text"
              value={settings.restaurantName}
              onChange={(e) => setSettings(prev => ({ ...prev, restaurantName: e.target.value }))}
              className="ui-control"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              className="ui-control"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
              className="ui-control"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="text"
              value={settings.website}
              onChange={(e) => setSettings(prev => ({ ...prev, website: e.target.value }))}
              className="ui-control"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <textarea
              value={settings.address}
              onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              rows={2}
              className="ui-control min-h-24 py-2"
            />
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="ui-panel">
        <div className="mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-amber-600" />
          <h2 className="text-base font-semibold text-foreground">Opening Hours</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(settings.openingHours).map(([day, hours]) => (
            <div key={day} className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
              <div className="w-24">
                <span className="text-sm font-medium capitalize text-foreground">{day}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!hours.closed}
                  onChange={(e) => updateHours(day, 'closed', !e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-muted-foreground">Open</span>
              </div>
              {!hours.closed && (
                <>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => updateHours(day, 'open', e.target.value)}
                    className="ui-control h-10 px-3 py-2"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => updateHours(day, 'close', e.target.value)}
                    className="ui-control h-10 px-3 py-2"
                  />
                </>
              )}
              {hours.closed && (
                <span className="text-sm text-red-600">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="ui-panel">
        <h2 className="mb-6 text-base font-semibold text-foreground">Pricing Settings</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
              className="ui-control"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Service Charge (%)</label>
            <input
              type="number"
              value={settings.serviceCharge}
              onChange={(e) => setSettings(prev => ({ ...prev, serviceCharge: parseFloat(e.target.value) || 0 }))}
              className="ui-control"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Delivery Fee (GH₵)</label>
            <input
              type="number"
              value={settings.deliveryFee}
              onChange={(e) => setSettings(prev => ({ ...prev, deliveryFee: parseFloat(e.target.value) || 0 }))}
              className="ui-control"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

