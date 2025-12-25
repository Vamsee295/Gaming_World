import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Clock, Plus, Trophy, Tag, Video, Megaphone } from "lucide-react";
import { useCommunity } from "@/context/CommunityContext";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import CommunityNav from "@/components/community/CommunityNav";
import { BackButton } from "@/components/ui/BackButton";
// Date formatting helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const eventTypeIcons = {
  tournament: Trophy,
  sale: Tag,
  stream: Video,
  announcement: Megaphone,
};

export default function EventsPage() {
  const { events, addEvent, rsvpEvent, cancelRSVP } = useCommunity();
  const { user } = useUser();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = events.filter(event =>
    filter === "all" || event.type === filter
  );

  const selectedEventData = events.find(e => e.id === selectedEvent);
  const isRSVPed = selectedEventData && user ? selectedEventData.participants.includes(user.id || "") : false;
  const isFull = selectedEventData && selectedEventData.maxParticipants
    ? selectedEventData.participants.length >= selectedEventData.maxParticipants
    : false;

  return (
    <>
      <Head>
        <title>Events & Tournaments - GameVerse Community</title>
      </Head>

      <div className="min-h-screen bg-background">
        <CommunityNav />

        {/* Back Button */}
        <div className="container mx-auto px-4 pt-4">
          <BackButton />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Events & Tournaments</h1>
            <p className="text-muted-foreground">Discover upcoming tournaments, sales, streams, and community events</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Events
            </Button>
            <Button
              variant={filter === "tournament" ? "default" : "outline"}
              onClick={() => setFilter("tournament")}
            >
              Tournaments
            </Button>
            <Button
              variant={filter === "sale" ? "default" : "outline"}
              onClick={() => setFilter("sale")}
            >
              Sales
            </Button>
            <Button
              variant={filter === "stream" ? "default" : "outline"}
              onClick={() => setFilter("stream")}
            >
              Streams
            </Button>
            <Button
              variant={filter === "announcement" ? "default" : "outline"}
              onClick={() => setFilter("announcement")}
            >
              Announcements
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No events scheduled. Check back soon!</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const Icon = eventTypeIcons[event.type] || Calendar;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full hover:border-primary transition-all cursor-pointer" onClick={() => setSelectedEvent(event.id)}>
                      {event.image && (
                        <div className="relative h-48 w-full">
                          <Image src={event.image} alt={event.title} fill className="object-cover rounded-t-lg" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </div>
                          <Badge variant="secondary">{event.type}</Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {formatDate(event.startDate)}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {event.participants.length} {event.maxParticipants ? `/ ${event.maxParticipants}` : ""} participants
                          </div>
                        </div>
                        {event.isRSVPRequired && (
                          <Button className="w-full mt-4" variant={event.participants.includes(user?.id || "") ? "outline" : "default"}>
                            {event.participants.includes(user?.id || "") ? "RSVPed" : "RSVP"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            {selectedEventData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = eventTypeIcons[selectedEventData.type] || Calendar;
                      return <Icon className="h-5 w-5 text-primary" />;
                    })()}
                    <DialogTitle>{selectedEventData.title}</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedEventData.description}</p>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Start Date</div>
                      <div className="font-semibold">{formatDate(selectedEventData.startDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">End Date</div>
                      <div className="font-semibold">{formatDate(selectedEventData.endDate)}</div>
                    </div>
                    {selectedEventData.location && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Location</div>
                        <div className="font-semibold">{selectedEventData.location}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Participants</div>
                      <div className="font-semibold">
                        {selectedEventData.participants.length}
                        {selectedEventData.maxParticipants && ` / ${selectedEventData.maxParticipants}`}
                      </div>
                    </div>
                  </div>
                  {selectedEventData.isRSVPRequired && user && (
                    <div className="flex gap-2">
                      {isRSVPed ? (
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            if (user.id) cancelRSVP(selectedEventData.id, user.id);
                            setSelectedEvent(null);
                          }}
                          disabled={isFull}
                        >
                          Cancel RSVP
                        </Button>
                      ) : (
                        <Button
                          className="flex-1"
                          onClick={() => {
                            if (user.id) rsvpEvent(selectedEventData.id, user.id);
                            setSelectedEvent(null);
                          }}
                          disabled={isFull}
                        >
                          {isFull ? "Event Full" : "RSVP Now"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

